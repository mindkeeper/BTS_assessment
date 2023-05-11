const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Checklist = sequelize.define(
  "checklist",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = Checklist;
