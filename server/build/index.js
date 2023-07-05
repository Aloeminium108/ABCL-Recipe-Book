"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_data_controller_1 = __importDefault(require("./controllers/user_data_controller"));
const recipe_data_controller_1 = __importDefault(require("./controllers/recipe_data_controller"));
const rating_reviews_controller_1 = __importDefault(require("./controllers/rating_reviews_controller"));
const app = (0, express_1.default)();
// CONFIGURATION / MIDDLEWARE
require('dotenv').config();
// this corsOptions snippet was adapted from https://stackoverflow.com/questions/42710057/fetch-cannot-set-cookies-received-from-the-server
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Recipe API'
    });
});
// CONTROLLERS 
app.use('/users', user_data_controller_1.default);
app.use('/recipes', recipe_data_controller_1.default);
app.use('/reviews', rating_reviews_controller_1.default);
// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Cooking on port: ${process.env.PORT}`);
});
