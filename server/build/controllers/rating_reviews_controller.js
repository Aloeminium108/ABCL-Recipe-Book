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
const authentication_1 = __importDefault(require("../authentication"));
const cookie_1 = require("cookie");
const reviews = require('express').Router();
const { Rating_reviews, User_data, Recipe_data } = models_1.default;
// FIND ALL REVIEWS
reviews.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundReviews = yield Rating_reviews.findAll({
            order: [['rating_reviews_id', 'ASC']],
            include: [
                {
                    model: User_data,
                    as: 'author'
                },
                {
                    model: Recipe_data,
                    as: 'recipe'
                }
            ]
        });
        res.status(200).json(foundReviews);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// FIND A SPECIFIC REVIEW
// reviews.get('/:id', async (req, res) => {
//     try {
//         const foundReview = await Rating_reviews.findOne({
//             where: { rating_reviews_id: req.params.id }
//         })
//         res.status(200).json(foundReview)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })
// FIND ALL REVIEWS TIED TO A SPECIFIC RECIPE
reviews.get('/recipes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundReviews = yield Rating_reviews.findAll({
            where: { recipe_id: req.params.id }
        });
        res.status(200).json(foundReviews);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// CREATE A REVIEW
reviews.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, session_token } = (0, cookie_1.parse)(req.headers.cookie + '');
        if (user_id === undefined || session_token === undefined || user_id !== req.params.id) {
            res.status(401).json({ recipe_id: null });
            return;
        }
        if (yield authentication_1.default.confirmToken(parseInt(user_id), session_token)) {
            // const newReview = await Rating_reviews.create(req.body)
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
            const newReview = yield Rating_reviews.create(recipeInfo);
            res.status(200).json({
                message: `Successfully posted review: ${newReview}`
            });
        }
        else {
            res.status(401).json({ rating_reviews_id: null });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// UPDATE A REVIEW
reviews.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedReview = yield Rating_reviews.update(req.body, {
            where: {
                rating_reviews_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully updated ${updatedReview} reviews(s)`
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE A REVIEW
reviews.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReview = yield Rating_reviews.destroy({
            where: {
                rating_reviews_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedReview} review(s)`
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// EXPORT
exports.default = reviews;
