import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../../actions";
import "./CreateForm.css";
import { dietIcons } from "../..";

export const CreateForm = () => {
  const diets = useSelector((state) => state.diets);
  const loading = useSelector((state) => state.loading);
  const [formRecipe, setFormRecipe] = useState({
    title: null,
    summary: null,
    healthScore: null,
    isHealthy: false,
    instructions: null,
    image: null,
    diets: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "isHealthy") {
      setFormRecipe({
        ...formRecipe,
        isHealthy: e.target.checked,
      });
    } else if (e.target.checked) {
      setFormRecipe({
        ...formRecipe,
        diets: [...formRecipe.diets, e.target.name],
      });
    } else {
      setFormRecipe({
        ...formRecipe,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formRecipe);
    for (let key in formRecipe) {
      if (!formRecipe[key]) {
        alert("Please fill out all fields");
        return;
      }
    }
    dispatch(createRecipe(formRecipe));
  };

  return (
    !loading && (
      <div className="create-main-container">
        <form className="create-form">
          <label className="create-label">
            Title
            <input
              className="create-input title-input"
              type="text"
              name="title"
              placeholder="Mama's Pizza.."
              onChange={handleChange}
            />
          </label>
          <label className="create-label">
            Summary
            <textarea
              className="create-input create-textarea summary"
              name="summary"
              placeholder="Enter a short summary of your recipe"
              onChange={handleChange}
            />
          </label>
          <div className="create-section-one">
            <label className="create-label">
              Score
              <input
                className="create-input"
                type="number"
                name="healthScore"
                onChange={handleChange}
              />
            </label>
            <label className="create-label">
              Is Healthy?
              <input
                className="create-input"
                type="checkbox"
                name="isHealthy"
                onChange={handleChange}
              />
            </label>
            <label className="create-label">
              Image
              <input
                className="create-input"
                type="text"
                name="image"
                placeholder="Image URL"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="create-section-two">
            <label className="create-label">
              Diets
              {diets.map((diet) => {
                return (
                  <div key={diet.id}>
                    <input
                      type="checkbox"
                      name={diet.dietName}
                      onChange={handleChange}
                    />
                    <img
                      src={dietIcons[diet.dietName]}
                      alt={diet.dietName}
                      className="create-diet-icon"
                    />
                    {diet.dietName}
                  </div>
                );
              })}
            </label>
            <label className="create-label create-instructions">
              Instructions
              <textarea
                className="create-input create-textarea"
                name="instructions"
                placeholder="1. Put the ingredients in the bowl.\n2. Mix it up.\n3. Enjoy!"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    )
  );
};
