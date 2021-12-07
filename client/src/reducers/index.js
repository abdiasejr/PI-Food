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
    if(action.type === 'FILTER_RECIPES') {
        let filteredRecipes = [];

        if(action.payload.searchValue) {
            filteredRecipes = state.recipes.filter(recipe => {
                return recipe.title.toLowerCase().includes(action.payload.searchValue.toLowerCase())
            })
        } else {
            filteredRecipes = state.recipes;
        }

        if(action.payload.sortValue.length > 0) {
            filteredRecipes = filteredRecipes.sort((a, b) => {
                if (action.payload.sortValue === "title alphabetically") {
                    return a.title.localeCompare(b.title);
                } else if (action.payload.sortValue === "title reversed") {
                    return b.title.localeCompare(a.title);
                } else if (action.payload.sortValue === "healthScore higher") {
                    return b.healthScore - a.healthScore;
                } else if (action.payload.sortValue === "healthScore lower") {
                    return a.healthScore - b.healthScore;
                } else {
                    return a;
                }
            });
        }


        if(action.payload.dietsIncluded.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                let flag = false;
                for(let key in action.payload.dietsIncluded) {
                    if(!recipe.diets.includes(action.payload.dietsIncluded[key])) {
                        flag = false;
                        break;
                    }
                    flag = true;
                }
                return flag;
            })
        }
        return {
            ...state,
            filteredRecipes: [...filteredRecipes],
        }
    }
    if(action.type === 'FIND_RECIPE') {
        return {
            ...state,
            search: action.payload,
        }
    }
    return state;
};