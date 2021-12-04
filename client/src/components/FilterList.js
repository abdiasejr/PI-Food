import React from "react";

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
            <div key={i}>
                <input 
                  type="checkbox" 
                  name={diet.dietName} 
                  value={diet.dietName}
                  onChange={(event) => handleCheckboxChange(event)}
                />
                <label>{diet.dietName}</label>
            </div>
        ))}
    </div>
  );
};
