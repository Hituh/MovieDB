// const { sequelize } = require("../models")

// module.exports = {
//   development: {
//     username: 'postgres',
//     password: null,
//     database: 'SBD',
//     host: '34.76.19.152',
//     dialect: 'postgres'
//   }
// }

module.exports = {
    HOST: '34.76.19.152',
    USER: 'postgres',
    PASSWORD: 'postgres',
    DB: 'SBD',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };