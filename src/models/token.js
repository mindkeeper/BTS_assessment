const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Token = sequelize.define(
  "token",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Token;
