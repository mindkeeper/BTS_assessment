require("dotenv").config();

const express = require("express");
const cors = require("cors");
const responseMiddleware = require("./src/helpers/sendResponse");
const sequelize = require("./src/configs/sequelize");
const mainRoutes = require("./src/routes/mainRoutes");
const User = require("./src/models/user");
const Token = require("./src/models/token");
const Checklist = require("./src/models/checklist");
const CheckListItem = require("./src/models/checkListItem");

Token.belongsTo(User);
User.hasOne(Token);
Checklist.belongsTo(User);
User.hasMany(Checklist);
CheckListItem.belongsTo(Checklist);
Checklist.hasMany(CheckListItem);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(responseMiddleware);
app.use(cors({ origin: "*" }));
app.use(mainRoutes);

sequelize
  .sync()
  .then(() => app.listen(8080, () => console.log("Runned")))
  .catch((err) => console.log(err));
