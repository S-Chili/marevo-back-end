const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const authRouter = express.Router();

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/signUp");

//signup
authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

//signin
authRouter.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

//upload avatar
authRouter.post(
  "/upload-avatar",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

authRouter.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

authRouter.get("/check", authenticate, ctrlWrapper(ctrl.check));

authRouter.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

authRouter.patch("/update", authenticate, ctrlWrapper(ctrl.updateUser));

module.exports = authRouter;
