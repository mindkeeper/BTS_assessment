const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const CheckListItem = sequelize.define(
  "checklistitem",
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = CheckListItem;
