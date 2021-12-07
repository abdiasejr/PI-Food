import React from "react";
import { Link } from "react-router-dom";
import { GiTomato } from "react-icons/gi";
import "./Landing.css";

export const Landing = () => {
  return (
    <div className="landing-container">
      <h2 className="landing-logo">
          <GiTomato className="landing-icon" />
          Fudify
        </h2>
      <div className="landing-main">
        <h1 className="landing-title">Simple and Tasty Recipes</h1>
        <p>
          Fudify is an app that allows you to search for recipes based on
          ingredients you have.
        </p>
        <Link to="/recipes" className="landing-link">
          <button className="landing-btn">Try it Now!</button>
        </Link>
      </div>
      <div className="landing-bg">
      </div>
    </div>
  );
};
