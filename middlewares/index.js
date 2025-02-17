const authenticate = require("./authenticate");
const validateBody = require("./validateBody");
const upload = require("./update");

module.exports = {
  validateBody,
  authenticate,
  upload,
};
