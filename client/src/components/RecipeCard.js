import React from 'react';
import "./RecipeCard.css";
import { dietIcons } from '..';

export const RecipeCard = ({ title, image, diets }) => {
    return (
        <div className="recipe-card">
            <img src={image} alt={title} className="recipe-card-image"/>
            <div className="recipe-card-body">
                <h2 className="recipe-card-title">{title}</h2>
                <ul className="recipe-diets-list">
                {diets?.map((diet) => {
                    return typeof diet === "string" ?
                    <li key={diet} className="recipe-card-diet">
                        <span className="recipe-card-tooltip">{diet}</span>
                        <img src={dietIcons[diet]} alt={diet} className="recipe-card-icon"/>
                    </li> :
                    <li key={diet.dietName} className="recipe-card-diet">
                        <span className="recipe-card-tooltip">{diet.dietName}</span>
                        <img src={dietIcons[diet.dietName]} alt={diet.dietName} className="reciper-card-icon"/>
                    </li>
                })}
                </ul>
            </div>
        </div>
    )
}