import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

export const dietIcons = {
  "dairy free": "/assets/icons/001-dairy-free.png",
  "gluten free": "/assets/icons/002-gluten.png",
  "primal": "/assets/icons/003-meat.png",
  "paleolithic": "/assets/icons/004-stone-axe.png",
  "fodmap friendly": "/assets/icons/005-nuts.png",
  "vegan": "/assets/icons/006-carrots.png",
  "pescatarian": "/assets/icons/007-fish.png",
  "whole 30": "/assets/icons/008-leaf.png",
  "lacto ovo vegetarian": "/assets/icons/009-salad.png",
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);