const express = require("express");

const ctrl = require("../../controllers/subscribes/addSub");

const subsRouter = express.Router();

//contactsRouter.get("/", ctrl.getAll);

subsRouter.post("/subscribes", ctrl.addSub);

//subsRouter.post("/subscribes", addSub);

// contactsRouter.get("/:id", ctrl.getById);

// contactsRouter.delete("/:id", ctrl.removeById);

// contactsRouter.put("/:id", ctrl.updateById);

module.exports = subsRouter;
