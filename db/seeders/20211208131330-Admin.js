module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    login: 'Admin',
    email: 'admin@admin',
    password: '$2b$08$apPFt0QZYq4skWeHHV0hwe3Bo19PswmmNE4RVHBHmYykhgLT4Ft2m',
    isAdmin: 'true',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
