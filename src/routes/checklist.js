const createChecklistHandler = require("../controllers/checklist/createChecklist");
const deleteChecklistHanlder = require("../controllers/checklist/deleteCheckList");
const getAllHandler = require("../controllers/checklist/getAll");
const createItemHandler = require("../controllers/item/createItem");
const isLogin = require("../middlewares/isLogin");

const Router = require("express").Router();

Router.post("/:id/item", isLogin, createItemHandler);
Router.delete(":id", isLogin, deleteChecklistHanlder);
Router.post("/", isLogin, createChecklistHandler);
Router.get("/", isLogin, getAllHandler);
module.exports = Router;
