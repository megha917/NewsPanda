import React from "react";
import loading from "../loading.gif";

const Spinner = () => {
  return (
    <div className="my-5 d-flex justify-content-center">
      <img src={loading} alt="loading.." />
    </div>
  );
};

export default Spinner;
