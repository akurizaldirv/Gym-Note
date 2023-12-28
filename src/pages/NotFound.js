import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return <div class="not-found">
      <h1>404 <span><span className="not-found-mark">!</span>Found</span></h1>
      <p>Sadly, you're not supposed to be here. Go <Link to="/">Home</Link>!</p>
    </div>;
};

export default NotFound;
