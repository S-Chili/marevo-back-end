const express = require("express");

const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/forContacts");

const { validateBody, authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(ctrl.getAll));

contactsRouter.get("/:id", ctrl.getById);

contactsRouter.post(
  "/",
  validateBody(schemas.addSchema, "POST"),
  authenticate,
  ctrlWrapper(ctrl.add)
);

contactsRouter.delete("/:id", ctrl.removeById);

contactsRouter.put("/:id", ctrl.updateById);

module.exports = contactsRouter;
