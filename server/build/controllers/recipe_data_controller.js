"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const models_1 = __importDefault(require("../models/"));
const sequelize_1 = require("sequelize");
const cookie_1 = __importDefault(require("cookie"));
const authentication_1 = __importDefault(require("../authentication"));
const { Recipe_data, User_data, Rating_reviews } = models_1.default;
const recipes = require('express').Router();
// FIND ALL RECIPES
recipes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundRecipes = yield Recipe_data.findAll({
            order: [['recipe_id', 'ASC']],
            where: {
                title: { [sequelize_1.Op.like]: `%${req.query.name ? req.query.name : ''}%` }
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
        });
        res.status(200).json(foundRecipes);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
// SEARCH RECIPES
recipes.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield JSON.parse(req.query.tags);
        const foundRecipe = yield Recipe_data.findAll({
            where: { tags: { [sequelize_1.Op.contains]: tags } },
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
        });
        res.status(200).json(foundRecipe);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// FIND A SPECIFIC RECIPE
recipes.get('/show/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundRecipe = yield Recipe_data.findOne({
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
        });
        res.status(200).json(foundRecipe);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// CREATE A RECIPE
recipes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, session_token } = cookie_1.default.parse(req.headers.cookie + '');
        if (user_id === undefined || session_token === undefined) {
            res.status(401).json({ recipe_id: null });
            return;
        }
        if (yield authentication_1.default.confirmToken(parseInt(user_id), session_token)) {
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
            };
            const newRecipe = yield Recipe_data.create(recipeInfo);
            res.status(200).json({
                message: 'Successfully inserted a new recipe',
                data: newRecipe
            });
        }
        else {
            res.status(401).json({ recipe_id: null });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// UPDATE A RECIPE
recipes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, session_token } = cookie_1.default.parse(req.headers.cookie + '');
        if (user_id === undefined || session_token === undefined) {
            res.status(401).json({ recipe_id: null });
            return;
        }
        const recipeToUpdate = yield Recipe_data.findOne({
            where: {
                recipe_id: req.params.id,
                user_id: user_id
            }
        });
        if ((yield authentication_1.default.confirmToken(parseInt(user_id), session_token)) && recipeToUpdate) {
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
            };
            const updatedRecipe = yield Recipe_data.update(recipeInfo, {
                where: {
                    recipe_id: req.params.id
                }
            });
            res.status(200).json({
                message: `Successfully updated ${updatedRecipe} recipe(s)`
            });
        }
        else {
            res.status(401).json({ recipe_id: null });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
// DELETE A RECIPE
recipes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, session_token } = cookie_1.default.parse(req.headers.cookie + '');
        if (user_id === undefined || session_token === undefined) {
            res.status(401).json({ recipe_id: null });
            return;
        }
        const recipeToDelete = yield Recipe_data.findOne({
            where: {
                recipe_id: req.params.id,
                user_id: user_id
            }
        });
        if ((yield authentication_1.default.confirmToken(parseInt(user_id), session_token)) && recipeToDelete !== null) {
            const deletedRecipe = yield Recipe_data.destroy({
                where: {
                    recipe_id: req.params.id
                }
            });
            res.status(200).json({
                message: `Successfully deleted ${deletedRecipe} recipe(s)`
            });
        }
        else {
            res.status(403).json({ recipe_id: null });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
// EXPORT
exports.default = recipes;
