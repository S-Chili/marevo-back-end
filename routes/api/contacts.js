const express = require("express");

const ctrl = require("../../controllers/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.post("/", ctrl.add);

// contactsRouter.get("/:id", ctrl.getById);

// contactsRouter.delete("/:id", ctrl.removeById);

// contactsRouter.put("/:id", ctrl.updateById);

module.exports = contactsRouter;
