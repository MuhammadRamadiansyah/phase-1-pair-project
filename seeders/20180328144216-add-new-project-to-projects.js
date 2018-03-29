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
    return queryInterface.bulkInsert('Projects', [{
      title: 'Obat Nyamuk',
      status: 'open',
      location: 'Makassar',
      deadline: new Date("2018-11-11"),
      level: 'Advanced',
      semester: 7,
      major: 'Business',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Baygon',
      status: 'open',
      location: 'Papua',
      deadline: new Date("2018-12-12"),
      level: 'Master',
      semester: 7,
      major: 'Medicin',
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
