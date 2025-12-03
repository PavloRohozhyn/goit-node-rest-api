import { ValidationError, UniqueConstraintError } from "sequelize";

const errorHandler = (err, req, res, next) => {
  // error from Joi
  if (err && err instanceof ValidationError) {
    err.status = 400;
  }
  // error from Sequelize
  if (err && err instanceof UniqueConstraintError) {
    err.status = 409;
  }
  // error from Backend
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

export default errorHandler;
