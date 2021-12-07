import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes, getDiets, filterRecipes} from "../../actions";
import { FilterList } from "../../components/FilterList";
import { Pagination } from "../../components/Pagination";
import { RecipeList } from "../../components/RecipeList";
import { SearchBar } from "../../components/SearchBar";
import { SortList } from "../../components/SortList";
import './Home.css'

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
      dispatch(filterRecipes(dietsIncluded, searchValue, sortValue));
  }, [dietsIncluded, searchValue, sortValue]);
  
  return (!loading &&
    <React.Fragment>
      <div className="home-header">
        <h1> Fudify Recipes </h1>
        <SearchBar  
          setSearchValue={setSearchValue} 
          searchValue={searchValue}
        />
      </div>
      <div className="home-body">
        <div className="home-body_filters">
          <SortList setSortValue={setSortValue} />
          <FilterList 
            diets={diets}
            dietsIncluded={dietsIncluded}
            setDietsIncluded={setDietsIncluded}
          />
        </div>
        <RecipeList 
          currentPage={currentPage} 
          recipes={filteredRecipes.length ? filteredRecipes : recipes} 
        />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={filteredRecipes.length ? Math.ceil(filteredRecipes.length / 9) : Math.ceil(recipes.length / 9)}
      />
    </React.Fragment>
  );
};
