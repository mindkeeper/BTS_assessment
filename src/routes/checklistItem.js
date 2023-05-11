const createChecklistHandler = require("../controllers/checklist/createChecklist");
const isLogin = require("../middlewares/isLogin");

const Router = require("express").Router();

Router.post("/:id/item", isLogin, createChecklistHandler);
module.exports = Router;
