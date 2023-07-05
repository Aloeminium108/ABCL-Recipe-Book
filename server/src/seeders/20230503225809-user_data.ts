'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: any, Sequelize: any) {
    return queryInterface.bulkInsert('user_data', [{
      user_id: 1,
      username: 'username',
      password: 'password'
    }], {});
  },

  async down (queryInterface: any, Sequelize: any) {
    return queryInterface.bulkDelete('rating_reviews', null, {});
  }
};
