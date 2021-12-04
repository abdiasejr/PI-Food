import React, { useEffect } from 'react';
import { getRecipe } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

export const RecipeDetail = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.search);
    const loading = useSelector(state => state.loading);

    useEffect(() => {
        dispatch(getRecipe(recipeId));
    }, [recipeId]);

    return (!loading && 
        <div>
            <h1>Recipe Details</h1>
            <h2>{recipe.title}</h2>
            <p dangerouslySetInnerHTML={{__html: recipe.summary}} />
            <img src={recipe.image} alt={recipe.title} />
            <p>Score: {recipe.healthScore}</p>
            {recipe.instructions && 
            <div>
                <h3>Steps</h3>
                <span dangerouslySetInnerHTML={{__html: recipe.instructions}} />
            </div>
            }
        </div>
    );
};