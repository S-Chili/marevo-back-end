const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const check = require("./checkAuth");
const updateAvatar = require("./updateAvatar");
const updateUser = require("./updateUser");

// const updateFavorite = require("./updateFavorite");

module.exports = {
  login,
  register,
  getCurrent,
  logout,
  check,
  updateUser,
  updateAvatar,
};
