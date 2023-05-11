const mainRoutes = require("express").Router();
const authRouter = require("./auth");
const checklistRouter = require("./checklist");
const prefix = "/api";

mainRoutes.use(`${prefix}`, authRouter);

mainRoutes.use(`${prefix}/checklist`, checklistRouter);

module.exports = mainRoutes;
