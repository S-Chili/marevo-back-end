const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(RequestError(400, "missing required name field"));
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(RequestError(400, error.message)); // Додаємо return
      }
      next();
    }
  };

  return func;
};

module.exports = validateBody;
