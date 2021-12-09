const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiData = async (req, res) => {
    return await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&number=100&addRecipeInformation=true`);
}
const getApiInfo = async () => {
    const api = await getApiData();
    const apiInfo = await api.data.results.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            diets: recipe.diets,
            veryHealthy: recipe.veryHealthy,
            spoonacularScore: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
            instructions: recipe.analyzedInstructions[0]
        }
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll(
        {
            include: {
                model: Diet,
                as: 'diets',
                attributes: ['dietName'],
                through: {
                    attributes: []
                }
            }
        }
    );
};

const getRecipes = async () => {
    const recipes = await getApiInfo();
    const dbRecipes = await getDbInfo();
    return recipes.concat(dbRecipes);
};

router.get('/recipes', async (req, res) => {
    const { name } = req.query;
    const recipes = await getRecipes();
    if(name) {
        const filteredRecipe = recipes.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));
        if(filteredRecipe.length > 0) {
            res.status(200).json(filteredRecipe);
        } else {
            res.status(404).json({
                message: 'No se encontró ' + name,
            });
        } 
    } else {
        if(recipes.length > 0) {
            res.status(200).json(recipes);
        } else {
            res.status(404).json({
                message: 'No se encontraron recetas',
            });
        }
    }
});

router.get('/types', async (req, res) => {
    const info = await getApiData();
    info.data.results.forEach(recipe => {
        recipe.diets.forEach(diet => {
            Diet.findOrCreate({
                where: {
                    dietName: diet,
                }
            });
        });
    });
    const diets = await Diet.findAll();
    res.status(200).json(diets);
});

router.post('/recipe', async (req, res) => {
    const { title, summary, healthScore, isHealthy, instructions, image, diets} = req.body;
    const dietsIncluded = await Diet.findAll({
        where: {
            dietName: {
                [Op.or]: diets
            }
        }
    });
    const recipeCreated = await Recipe.create({
        title,
        summary,
        healthScore,
        isHealthy,
        instructions,
        image
    });
    recipeCreated.addDiets(dietsIncluded);
    res.status(201).json(recipeCreated);
});

router.get('/recipes/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    if(isNaN(recipeId)){
        const recipe = await Recipe.findOne(
            {
                where: {
                    id: recipeId
                },
                include: {
                    model: Diet,
                    as: 'diets',
                    attributes: ['dietName'],
                    through: {
                        attributes: []
                    }
                }
            }
        );
        if(recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({
                message: 'No se encontró la receta',
            });
        }
    } else {
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}`);
        if(recipe.data) {
            res.status(200).json(recipe.data);
        } else {
            res.status(404).json({
                message: 'No se encontró la receta',
            });
        }
    }
});

module.exports = router;
