import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <span>
        Back to <Link to="/">Home</Link>
      </span>
    </div>
  );
};

export default NotFoundPage;
