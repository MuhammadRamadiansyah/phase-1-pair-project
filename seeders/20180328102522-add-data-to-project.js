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
      title: 'Baling-baling bambu',
      status: 'open',
      location: 'Jakarta',
      deadline: new Date(2018-11-11),
      level: 'Beginner',
      semester: 5,
      major: 'Engineering',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Robot Ultron',
      status: 'open',
      location: 'Bandung',
      deadline: new Date(2018-10-12),
      level: 'Advanced',
      semester: 8,
      major: 'Engineering',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Penawar Racun',
      status: 'open',
      location: 'Surabaya',
      deadline: new Date(2018-12-11),
      level: 'Master',
      semester: 8,
      major: 'Medicine',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Lorong Waktu',
      status: 'open',
      location: 'Jakarta',
      deadline: new Date(2018-11-11),
      level: 'Beginner',
      semester: 1,
      major: 'IT',
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
