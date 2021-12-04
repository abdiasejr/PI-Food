import React from 'react';
import "./RecipeCard.css"

export const RecipeCard = ({ title, image, diets }) => {
    return (
        <div className="recipe-card">
            <h2 className="recipe-card-title">{title}</h2>
            <img src={image} alt={title} />
            <ul className="recipe-diets-list">
            {diets?.map((diet) => {
                return typeof diet === "string" ?
                <li key={diet} className="recipe-card-diet">{diet}</li> :
                <li key={diet.dietName} className="recipe-card-diet">{diet.dietName}</li>
            })}
            </ul>
        </div>
    )
}