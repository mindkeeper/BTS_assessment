const loginHandler = require("../controllers/auth/login");
const registerHandler = require("../controllers/auth/register");

const Router = require("express").Router();

Router.post("/register", registerHandler);
Router.post("/login", loginHandler);
module.exports = Router;
