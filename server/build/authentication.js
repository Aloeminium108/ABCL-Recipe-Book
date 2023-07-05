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
const index_1 = __importDefault(require("./models/index"));
const hash_js_1 = __importDefault(require("hash.js"));
const { Session_cookies, User_data } = index_1.default;
function generateToken() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const rand = Math.random() * 1000000;
    return hash_js_1.default.sha256().update(String(timestamp + rand)).digest('hex');
}
class Authentication {
    static createCookie(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Session_cookies.destroy({
                where: {
                    user_id: user_id
                }
            });
            const sessionCookieInfo = {
                user_id: user_id,
                session_token: generateToken()
            };
            const sessionToken = yield Session_cookies.create(sessionCookieInfo);
            return sessionToken;
        });
    }
    static confirmToken(user_id, session_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield Session_cookies.findOne({
                where: {
                    user_id: user_id,
                    session_token: session_token
                }
            });
            console.log("FOUND SESSION:");
            console.log(session);
            console.log(session !== null);
            console.log("END SESSION");
            return (session !== null);
        });
    }
    static logout(user_id, session_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = Session_cookies.findOne({
                where: {
                    user_id: user_id,
                    session_token: session_token
                }
            });
            if (session !== null) {
                Session_cookies.destroy({
                    where: {
                        user_id: user_id
                    }
                });
            }
        });
    }
    static viewSessionTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundTokens = Session_cookies.findAll({
                order: [['user_id', 'ASC']],
            });
            return foundTokens;
        });
    }
}
exports.default = Authentication;
