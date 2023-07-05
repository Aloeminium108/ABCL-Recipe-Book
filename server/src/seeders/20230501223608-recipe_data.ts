'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: any, Sequelize: any) {
    return queryInterface.bulkInsert('recipe_data', [{
      recipe_id: 1 ,
      user_id: 1 ,
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
  },

  async down (queryInterface: any, Sequelize: any) {
    return queryInterface.bulkDelete('recipe_data', null, {});
  }
};
