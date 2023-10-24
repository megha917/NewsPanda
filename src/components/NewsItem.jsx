import React from "react";
import "./NewsItem.css";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="container news-item">
      <div
        className="col-md-12 my-3 rounded-3"
        style={{
          backgroundColor: "white",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="row p-3 rounded-4">
          <div className="col-md-4">
            <img
              src={
                !imageUrl
                  ? "https://img.freepik.com/free-psd/newspaper-mockup_1310-579.jpg?t=st=1696793809~exp=1696794409~hmac=78ad8e85f25e893d31f99d23049a432e37db5795c8bbc29bfddc6a36c8573b2a"
                  : imageUrl
              }
              alt="..."
              className="news-item-img rounded-2"
            />
          </div>
          <div className="col-md-8">
            <h5> {title} </h5>
            <p> {description} </p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
              rel="noreferrer"
            >
              Read More..
            </a>
            <p className="card-text text-muted d-flex justify-content-end">
              Source: {source}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
