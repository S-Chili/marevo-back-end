const express = require("express");

const ctrl = require("../../controllers/orders");

const ordersRouter = express.Router();

ordersRouter.get("/", ctrl.getAll);

ordersRouter.post("/", ctrl.addOrder);

//subsRouter.post("/subscribes", addSub);

ordersRouter.get("/:id", ctrl.getById);

ordersRouter.delete("/:id", ctrl.removeById);

// contactsRouter.put("/:id", ctrl.updateById);

module.exports = ordersRouter;
