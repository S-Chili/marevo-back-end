const express = require("express");

const authRouter = express.Router();

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/signUp");

//signup
authRouter.post("/register", ctrl.register);

//signin
authRouter.post("/login", ctrl.login);

module.exports = authRouter;
