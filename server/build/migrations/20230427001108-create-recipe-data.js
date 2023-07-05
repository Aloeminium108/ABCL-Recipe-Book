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
            yield queryInterface.createTable('Recipe_data', {
                recipe_id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                title: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                pic: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                recipe_content: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                prep_time_in_minutes: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                cook_time_in_minutes: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                total_time_in_minutes: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                servings: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                tags: {
                    type: Sequelize.ARRAY(Sequelize.STRING),
                    allowNull: false,
                    defaultValue: []
                },
                avg_rating: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('Recipe_data');
        });
    }
};
