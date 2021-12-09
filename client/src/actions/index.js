import axios from "axios";

export function getAllRecipes() {
    return async dispatch => {
        try {
            const res = await axios.get("http://localhost:3001/recipes");
            dispatch({
                type: "GET_ALL_RECIPES",
                payload: res.data
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function getDiets() {
    return async dispatch => {
        try {
            const res = await axios.get("http://localhost:3001/types");
            dispatch({
                type: "GET_DIETS",
                payload: res.data
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function  getRecipe(id) {
    return async dispatch => {
        try {
            const res = await axios.get("http://localhost:3001/recipes/" + id);
            dispatch({
                type: "GET_RECIPE",
                payload: res.data
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function createRecipe(recipe) {
    return async dispatch => {
        try {
            const res = await axios.post("http://localhost:3001/recipe", recipe);
            dispatch({
                type: "CREATE_RECIPE",
                payload: res.data
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function filterRecipes(dietsIncluded, searchValue, sortValue) {
    return {
        type: "FILTER_RECIPES",
        payload: {
            dietsIncluded,
            searchValue,
            sortValue,
        }
    }
}

export function findRecipe(title) {
    return async dispatch => {
        try {
            const res = await axios.get("http://localhost:3001/recipes?name=" + title);
            dispatch({
                type: "FIND_RECIPE",
                payload: res.data[0]
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export function setLoading() {
    return {
        type: "LOADING"
    }
}