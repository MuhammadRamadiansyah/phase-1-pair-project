'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Tags', [{
      name: 'Electronic',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Transportation',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'IT',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Material',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Machine',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
