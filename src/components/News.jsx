import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles ? parsedData.articles : []);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsPanda`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    if (loading) {
      return;
    }
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(
        articles.concat(parsedData.articles ? parsedData.articles : [])
      );
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url("newspaper.jpg")',
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: "100%",
  };

  return (
    <div className="container-fluid m-0 p-0" style={backgroundStyle}>
      <div className="container bg-news-img">
        <h1
          className="mb-2 pb-3 pt-5 text-center"
          style={{ marginTop: "4rem" }}
        >
          NewsPanda - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner />}

        <InfiniteScroll
          key="infinite-scroll"
          pageStart={0}
          loadMore={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-12" key={element.url}>
                <NewsItem
                  key={element.url}
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <div className="container d-flex justify-content-evenly mt-3 pb-5"></div>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;