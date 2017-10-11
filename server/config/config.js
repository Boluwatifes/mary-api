const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'andeladeveloper',
    password: null,
    database: 'mary',
    host: 'localhost',
    dialect: 'postgres'
  },
  localTest: {
    username: 'andeladeveloper',
    password: null,
    database: 'maryTest',
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
    dialect: 'postgres'
  }
};
