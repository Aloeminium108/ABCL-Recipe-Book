'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.bulkInsert('recipe_data', [{
                    recipe_id: 1,
                    user_id: 1,
                    title: 'Focaccia Bread',
                    pic: null,
                    description: 'Delicious flaky Italian bread',
                    recipe_content: 'make your grandmother proud and bake bread',
                    prep_time_in_minutes: 180,
                    cook_time_in_minutes: 25,
                    total_time_in_minutes: 215,
                    servings: 8,
                    tags: [
                        'Italian',
                        'Dinner',
                        'Snack'
                    ],
                    avg_rating: null
                }], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return queryInterface.bulkDelete('recipe_data', null, {});
        });
    }
};
