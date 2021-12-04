const initialState = {
    recipes: [],
    diets: [],
    filteredRecipes: [],
    search: {},
    loading: true,
}

export default (state = initialState, action) => {
    if(action.type === 'GET_ALL_RECIPES') {
        return {
            ...state,
            recipes: action.payload,
            loading: false
        }
    }
    if(action.type === 'GET_DIETS') {
        return {
            ...state,
            diets: action.payload,
            loading: false
        }
    }
    if(action.type === 'GET_RECIPE') {
        return {
            ...state,
            search: action.payload,
            loading: false
        }
    }
    if(action.type === 'CREATE_RECIPE') {
        return {
            ...state,
            loading: false
        }
    }
    if(action.type === 'SORT_RECIPES') {
        let sortedRecipes = state.recipes.sort((a, b) => {
            if (action.payload === "title alphabetically") {
                return a.title?.localeCompare(b.title);
              } else if (action.payload === "title reversed") {
                return b.title?.localeCompare(a.title);
              } else if (action.payload === "healthScore higher") {
                return b.healthScore - a.healthScore;
              } else if (action.payload === "healthScore lower") {
                return a.healthScore - b.healthScore;
              } else {
                return a;
              }
        });
        return {
            ...state,
            recipes: [...sortedRecipes],
        }
    }
    if(action.type === 'SEARCH_RECIPE') {
        let searchedRecipes = [];
        state.filteredRecipes.length ? 
        searchedRecipes = state.filteredRecipes.filter(recipe => {
            return recipe.title.toLowerCase().includes(action.payload.toLowerCase())
        }) : 
        searchedRecipes = state.recipes.filter(recipe => {
            return recipe.title.toLowerCase().includes(action.payload.toLowerCase())
        })
        return {
            ...state,
            filteredRecipes: searchedRecipes,
        }
    }
    if(action.type === 'FILTER_RECIPES') {
        let filteredRecipes = state.recipes;
        for(let key in action.payload) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                return recipe.diets.includes(action.payload[key])
            })
        }
        return {
            ...state,
            filteredRecipes: filteredRecipes,
        }
    }
    return state;
};