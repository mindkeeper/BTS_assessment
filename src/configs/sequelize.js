const { Sequelize } = require("sequelize");

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
});

module.exports = sequelize;
