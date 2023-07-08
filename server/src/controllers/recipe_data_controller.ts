// DEPENDENCIES
import db from '../models/'
import { Op } from 'sequelize'
import cookie from 'cookie'
import Authentication from '../authentication'
import { Request, Response } from 'express'
const { Recipe_data, User_data, Rating_reviews } = db 
const recipes = require('express').Router()

// FIND ALL RECIPES
recipes.get('/', async (req: Request, res: Response) => {
    try {
        const foundRecipes = await Recipe_data.findAll({
            order: [ [ 'recipe_id', 'ASC'] ],
            where: {
                title: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
            include: [
                {
                    model: User_data,
                    as: 'author'
                },
                {
                    model: Rating_reviews,
                    as: 'reviews'
                }
            ]
        })
        res.status(200).json(foundRecipes)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// SEARCH RECIPES
recipes.get('/search', async (req: Request, res: Response) => {
    try {

        const tags = await JSON.parse(req.query.tags as string)

        const foundRecipe = await Recipe_data.findAll({
            where: { tags: { [Op.contains]: tags } },
            include: [
                {
                    model: User_data,
                    as: 'author'
                },
                {
                    model: Rating_reviews,
                    as: 'reviews'
                }
            ]
        })
        res.status(200).json(foundRecipe)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC RECIPE
recipes.get('/show/:id', async (req: Request, res: Response) => {
    try {
        const foundRecipe = await Recipe_data.findOne({
            where: { recipe_id: req.params.id },
            include: [
                {
                    model: User_data,
                    as: 'author'
                },
                {
                    model: Rating_reviews,
                    as: 'reviews'
                }
            ]
        })
        res.status(200).json(foundRecipe)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A RECIPE
recipes.post('/', async (req: Request, res: Response) => {
    try {

        const { user_id, session_token } = cookie.parse(req.headers.cookie + '')

        if (user_id === undefined || session_token === undefined) {
            res.status(401).json({recipe_id: null})
            return
        }

        if (await Authentication.confirmToken(parseInt(user_id), session_token)) {

            const recipeInfo = {
                user_id: user_id,
                title: req.body.title,
                description: req.body.description,
                recipe_content: req.body.content,
                prep_time_in_minutes: req.body.prepTime,
                cook_time_in_minutes: req.body.cookTime,
                total_time_in_minutes: parseInt(req.body.prepTime) + parseInt(req.body.cookTime),
                servings: req.body.servings,
                tags: req.body.tags.toLowerCase().split(' '),
                avg_rating: 3
            }
    
            const newRecipe = await Recipe_data.create(recipeInfo)
            res.status(200).json({
                message: 'Successfully inserted a new recipe',
                data: newRecipe
            })

        } else {
            res.status(401).json({recipe_id: null})
        }

    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A RECIPE
recipes.put('/:id', async (req: Request, res: Response) => {
    try {
        const { user_id, session_token } = cookie.parse(req.headers.cookie + '')

        if (user_id === undefined || session_token === undefined) {
            res.status(401).json({recipe_id: null})
            return
        }

        const recipeToUpdate = await Recipe_data.findOne({
            where: {
                recipe_id: req.params.id,
                user_id: user_id
            }
        })

        if (await Authentication.confirmToken(parseInt(user_id), session_token) && recipeToUpdate) {

            const recipeInfo = {
                user_id: user_id,
                title: req.body.title,
                description: req.body.description,
                recipe_content: req.body.content,
                prep_time_in_minutes: parseInt(req.body.prepTime),
                cook_time_in_minutes: parseInt(req.body.cookTime),
                total_time_in_minutes: parseInt(req.body.prepTime) + parseInt(req.body.cookTime),
                servings: parseInt(req.body.servings),
                tags: req.body.tags.toLowerCase().split(' '),
                avg_rating: 3
            }
    
            const updatedRecipe = await Recipe_data.update(recipeInfo, {
                where: {
                    recipe_id: req.params.id
                }
            })
            res.status(200).json({
                message: `Successfully updated ${updatedRecipe} recipe(s)`
            })

        } else {
            res.status(401).json({recipe_id: null})
        }

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// DELETE A RECIPE
recipes.delete('/:id', async (req: Request, res: Response) => {
    try {

        const { user_id, session_token } = cookie.parse(req.headers.cookie + '')

        if (user_id === undefined || session_token === undefined) {
            res.status(401).json({recipe_id: null})
            return
        }

        const recipeToDelete = await Recipe_data.findOne({
            where: {
                recipe_id: req.params.id,
                user_id: user_id
            }
        })

        if (await Authentication.confirmToken(parseInt(user_id), session_token) && recipeToDelete !== null) {
            const deletedRecipe = await Recipe_data.destroy({
                where: {
                    recipe_id: req.params.id
                }
            })
            res.status(200).json({
                message: `Successfully deleted ${deletedRecipe} recipe(s)`
            })
        } else {
            res.status(403).json({recipe_id: null})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// EXPORT
export default recipes