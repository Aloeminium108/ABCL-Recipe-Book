'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: any, Sequelize: any) {
    return queryInterface.bulkInsert('rating_reviews', [{
      rating_review_id: 1,
      recipe_id: 1,
      user_id: 1,
      rating: 5,
      review: 'best bread ever! will make again!'
    }], {});
  },

  async down (queryInterface: any, Sequelize: any) {
    return queryInterface.bulkDelete('rating_reviews', null, {});
  }
};
