'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lecturers', [
      {
        name: 'Thomas Ferguson',
        username: 'ferguson',
        password: 'f87nsdft8w78wefy8',
        salt: 'f87nsdft',
        email: 'ferguson@study.org',
        phone: '082184117950',
        major: 'Engineering',
        degree: 'S2',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'Liam Giggs',
        username: 'giggs',
        password: 'f87nsdft8w78wefy8',
        salt: 'f87nsdft',
        email: 'giggs@study.org',
        phone: '087613712537',
        major: 'IT',
        degree: 'S3',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'Bambang Pemangkas',
        username: 'pemangkas',
        password: 'f87nsdft8w78wefy8',
        salt: 'f87nsdft',
        email: 'pemangkas@study.org',
        phone: '08716235762576',
        major: 'Business',
        degree: 'S1',
        createdAt:new Date(),
        updatedAt:new Date()
      },{
        name: 'Wong Fei Hung',
        username: 'hung',
        password: 'f87nsdft8w78wefy8',
        salt: 'f87nsdft',
        email: 'hung@study.org',
        phone: '08126731723175',
        major: 'Medicine',
        degree: 'S3',
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
