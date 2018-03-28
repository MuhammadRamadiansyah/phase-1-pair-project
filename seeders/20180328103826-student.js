'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        name: 'Roy Suyatmo',
        username: 'suyatmo',
        password: 's7d8fgy98a7ynew87',
        salt: 's7d8fgy',
        email: 'suyatmo@gmail.com',
        phone: '089994356780',
        major: 'Engineering',
        semester: 4,
        contribution: 4,
        level:'Beginner',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'Ricardo Kaka',
        username: 'kaka',
        password: 's7d8fgy98a7ynew87',
        salt: 's7d8fgy',
        email: 'kaka@gmail.com',
        phone: '0892178917275',
        major: 'Engineering',
        semester: 2,
        contribution: 8,
        level:'Senior',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'Ahmad Dhani',
        username: 'dhani',
        password: 's7d8fgy98a7ynew87',
        salt: 's7d8fgy',
        email: 'dhani@gmail.com',
        phone: '0867126375761',
        major: 'Literatur',
        semester: 12,
        contribution: 0,
        level:'Beginner',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'Jhon Doe',
        username: 'doe',
        password: 's7d8fgy98a7ynew87',
        salt: 's7d8fgy',
        email: 'doe@gmail.com',
        phone: '0867162761223',
        major: 'IT',
        semester: 6,
        contribution: 20,
        level:'Master',
        createdAt:new Date(),
        updatedAt:new Date()
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
