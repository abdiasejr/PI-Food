import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes, getDiets, sortRecipes, searchRecipe, filterRecipes} from "../../actions";
import { FilterList } from "../../components/FilterList";
import { Pagination } from "../../components/Pagination";
import { RecipeList } from "../../components/RecipeList";
import { SearchBar } from "../../components/SearchBar";
import { SortList } from "../../components/SortList";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dietsIncluded, setDietsIncluded] = useState([]);

  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, []);

  useEffect(() => {
    if(sortValue) {
      dispatch(sortRecipes(sortValue));
      console.log(recipes);
    }
  }, [sortValue]);

  useEffect(() => {
    if(searchValue) {
      dispatch(searchRecipe(searchValue));
      console.log(filteredRecipes);
    }
  }, [searchValue]);
  
  useEffect(() => {
    if(dietsIncluded) {
      dispatch(filterRecipes(dietsIncluded));
      console.log(filteredRecipes);
    }
  }, [dietsIncluded]);
    
  return (!loading &&
    <div>
      <SearchBar  
        setSearchValue={setSearchValue} 
      />
      <SortList setSortValue={setSortValue} />
      <FilterList 
        diets={diets}
        dietsIncluded={dietsIncluded}
        setDietsIncluded={setDietsIncluded}
      />
      <RecipeList 
        currentPage={currentPage} 
        recipes={filteredRecipes.length ? filteredRecipes : recipes} 
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={filteredRecipes.length ? Math.ceil(filteredRecipes.length / 9) : Math.ceil(recipes.length / 9)}
      />
    </div>
  );
};
