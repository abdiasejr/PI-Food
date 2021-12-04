import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Link } from 'react-router-dom';
import "./RecipeList.css"

export const RecipeList = ({ recipes, currentPage }) => {
    return (
        <section className="recipe-list">
            {recipes?.slice((currentPage - 1) * 9, currentPage * 9).map(recipe => (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="recipe-link">
                    <RecipeCard 
                        title={recipe.title}
                        image={recipe.image}
                        diets={recipe.diets}
                    />
                </Link>
            ))}
        </section>
    )
}