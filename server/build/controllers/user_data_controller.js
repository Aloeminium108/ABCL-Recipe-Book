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
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const cookie_1 = __importDefault(require("cookie"));
const authentication_1 = __importDefault(require("../authentication"));
const { User_data, Recipe_data, Rating_reviews } = models_1.default;
const user = require('express').Router();
// FIND ALL USERS
user.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUsers = yield User_data.findAll({
            order: [['user_id', 'ASC']],
            where: {
                username: { [sequelize_1.Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            },
            include: [
                {
                    model: Recipe_data,
                    as: 'recipes'
                },
                {
                    model: Rating_reviews,
                    as: 'reviews'
                }
            ]
        });
        res.status(200).json(foundUsers);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// FIND A SPECIFIC USER
user.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield User_data.findOne({
            where: { user_id: req.params.id }
        });
        res.status(200).json(foundUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// CREATE A USER
user.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User_data.create(req.body);
        const sessionToken = yield authentication_1.default.createCookie(newUser.user_id);
        res.statusCode = 200;
        res.setHeader('Set-Cookie', [
            cookie_1.default.serialize('session_token', sessionToken.session_token, {
                secure: true,
                httpOnly: true,
                path: '/',
                sameSite: 'none'
            }),
            cookie_1.default.serialize('user_id', newUser.user_id, {
                secure: true,
                httpOnly: true,
                path: '/',
                sameSite: 'none'
            })
        ]);
        res.json(newUser);
        res.end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
// VERIFY LOGIN FOR USER
user.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield User_data.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        });
        if (foundUser) {
            //res.status(200).json(foundUser)
            const sessionToken = yield authentication_1.default.createCookie(foundUser.user_id);
            res.statusCode = 200;
            res.setHeader('Set-Cookie', [
                cookie_1.default.serialize('session_token', sessionToken.session_token, {
                    secure: true,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'none'
                }),
                cookie_1.default.serialize('user_id', foundUser.user_id, {
                    secure: true,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'none'
                })
            ]);
            res.json(foundUser);
            res.end();
        }
        else {
            res.status(401).json({ user_id: null });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// TEST CONTROLLER 
user.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.headers.cookie);
        res.status(200).json({ cookies: req.headers.cookie });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
user.post('/session/view', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield authentication_1.default.viewSessionTokens();
        res.status(200).json(tokens);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
user.post('/session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, session_token } = cookie_1.default.parse(req.headers.cookie + '');
        if (user_id === undefined || session_token === undefined) {
            res.status(200).json({ user_id: null });
            return;
        }
        if (yield authentication_1.default.confirmToken(parseInt(user_id), session_token)) {
            console.log("LOGGING IN WITH SESSION TOKEN");
            const user = yield User_data.findOne({
                where: {
                    user_id: parseInt(user_id)
                }
            });
            res.status(200).json(user);
        }
        else {
            res.status(401).json({ user_id: null });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
// UPDATE A USER
user.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User_data.update(req.body, {
            where: {
                user_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully updated ${updatedUser} user(s)`
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE A USER
user.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_data.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedUser} user(s)`
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
user.delete('/logout/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, session_token } = cookie_1.default.parse(req.headers.cookie);
        if (user_id === undefined || session_token === undefined) {
            res.status(200).json({ user_id: null });
            return;
        }
        yield authentication_1.default.logout(parseInt(user_id), session_token);
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// EXPORT
exports.default = user;
