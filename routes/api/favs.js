const express = require("express");

const ctrl = require("../../controllers/favs");

const favsRouter = express.Router();

favsRouter.get("/", ctrl.getAll);

favsRouter.post("/", ctrl.addFav);

favsRouter.get("/:id", ctrl.getById);

favsRouter.delete("/:id", ctrl.removeById);

module.exports = favsRouter;
