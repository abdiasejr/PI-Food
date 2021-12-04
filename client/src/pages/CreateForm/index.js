import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiets, createRecipe } from '../../actions';

export const CreateForm = () => {
    const diets = useSelector((state) => state.diets);
    const loading = useSelector((state) => state.loading);
    const [formRecipe, setFormRecipe] = useState({
        title: null,
        summary: null,
        healthScore: null,
        isHealthy: null,
        instructions: null,
        image: null,
        diets: [],
    });


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiets());
    }, []);


    const handleChange = (e) => {
        if(e.target.name === 'isHealthy' ) {
            setFormRecipe({
                ...formRecipe,
                isHealthy: e.target.checked 
            }) 
        } else if(e.target.value === 'on' ) {
            setFormRecipe({
                ...formRecipe,
                diets: [...formRecipe.diets, e.target.name]
            }) 
        } else if(e.target.name === 'image'){
            if(e.target.files[0]) {
                setFormRecipe({
                    ...formRecipe,
                    image: URL.createObjectURL(e.target.files[0])
                })
            }
        }else {
            setFormRecipe({
                ...formRecipe,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formRecipe);
        for(let key in formRecipe) {
            if(!formRecipe[key]) {
                alert('Please fill out all fields');
                return;
            }
        }
        dispatch(createRecipe(formRecipe));
        console.log(formRecipe);
    }

    return (!loading &&
        <div>
            <form>
                <label>
                    Title:
                    <input type="text" name="title" onChange={handleChange}/>
                </label>
                <label>
                    Summary:
                    <input type="text" name="summary" onChange={handleChange} />
                </label>
                <label>
                    Score: 
                    <input type="number" name="healthScore" onChange={handleChange}/>
                </label>
                <label>
                    Image:
                    <input type="file" name="image" onChange={handleChange}/>
                </label>
                <label>
                    is Healthy:
                    <input type="checkbox" name="isHealthy" onChange={handleChange} />
                </label>
                <label>
                    Diets:
                    {diets.map((diet) => {
                        return (
                            <div key={diet.id}>
                                <input type="checkbox" name={diet.dietName} onChange={handleChange}/>
                                {diet.dietName}
                            </div>
                        );
                    })}
                </label>
                <label>
                    Instructions:
                    <textarea name="instructions" onChange={handleChange}/>
                </label>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}