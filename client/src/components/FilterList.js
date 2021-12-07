import React from "react";
import  "./FilterList.css";
import { dietIcons } from "..";

export const FilterList = ({ diets, dietsIncluded, setDietsIncluded}) => {
  

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    checked ? 
      setDietsIncluded([...dietsIncluded, name]) :
      setDietsIncluded(dietsIncluded.filter(diet => diet !== name));
  }
  
  return (
    <div className="filter-list">
      <label> Filter by Diets: </label>
        {diets.map((diet, i)=> (
            <div key={i} className="filter-diet">
                <input 
                  type="checkbox" 
                  name={diet.dietName} 
                  value={diet.dietName}
                  onChange={(event) => handleCheckboxChange(event)}
                />
                <img src={dietIcons[diet.dietName]} alt={diet.dietName}  className="filter-icon"/>
                <label>{diet.dietName}</label>
            </div>
        ))}
    </div>
  );
};
