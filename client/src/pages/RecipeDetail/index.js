import React, { useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import { getRecipe } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { dietIcons } from "../../";
import "./RecipeDetail.css";

export const RecipeDetail = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.search);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getRecipe(recipeId));
  }, [recipeId]);

  return (
    !loading && (
      <div className="details-container">
        <div className="details-header ">
          <Link to="/recipes" className="details-header-back item-container">
            <TiArrowBack />
          </Link>
          <h1 className="item-container">Recipe Details</h1>
        </div>
        <div className="details-body">
          <img src={recipe.image} alt={recipe.title} className="details-body-img"/>
          <div className="details-body-info">
            <h2 className="details-body-title item-container">{recipe.title}</h2>
            <p className="item-container">Score: {recipe.healthScore}</p>
            <ul className="detail-diets-list">
                {recipe.diets?.map((diet) => {
                    return typeof diet === "string" ?
                    <li key={diet} className="detail-diets">
                        <span className="detail-tooltip">{diet}</span>
                        <img src={dietIcons[diet]} alt={diet} className="detail-icon"/>
                    </li> :
                    <li key={diet.dietName} className="detail-diets">
                        <span className="detail-tooltip">{diet.dietName}</span>
                        <img src={dietIcons[diet.dietName]} alt={diet.dietName} className="detail-icon"/>
                    </li>
                })}
            </ul>
          </div>
        </div>
            <div className="details-body-description">
                <h3 className="item-container">Description</h3>
                <p className="item-container" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </div>
          {recipe.instructions && (
            <div className="details-body-instructions item-container">
              <h3>Steps</h3>
              <span dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
          )}
      </div>
    )
  );
};
