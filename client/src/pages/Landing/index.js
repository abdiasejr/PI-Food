import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      <h1>Welcome to Foodify</h1>
      <p>
        Foodify is an app that allows you to search for recipes based on
        ingredients you have.
      </p>
      <Link to="/recipes">
        <button>Get Started</button>
      </Link>
    </div>
  );
};
