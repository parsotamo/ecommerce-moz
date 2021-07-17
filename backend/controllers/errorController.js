const AppError = require("../utils/AppError");

const castErrorHandler = (error) => {
  return new AppError(`${error.path}: ${error.value}. Não existe!`, 400);
};

const validationErrorHandler = (error) => {
  const messages = Object.values(error.errors)
    .map((el) => el.message)
    .join(". ");
  return new AppError(`Erro(s) de validação: ${messages}`, 400);
};

const duplicateKeyErrorHandler = (error) => {
  const value = error.message.match(/\{.+\}/);
  console.log(value);
  return new AppError(
    `Erro de duplicação de dados. Este dados já existem no sistéma ${value}.`,
    400
  );
};

const jsonWebTokenErrorHandler = (error) => {
  return new AppError(
    `Erro de token: ${error.message}. Faça login de novo`,
    400
  );
};

const tokenErrorHandler = () => {
  return new AppError("Token expirou! Faça login novamente.", 401);
};
const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    name: error.name,
    message: error.message,
    error: error,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Erro interno, volte mais tarde",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = castErrorHandler(err);
    if (err.name === "ValidationError") err = validationErrorHandler(err);
    if (err.code === 11000) err = duplicateKeyErrorHandler(err);
    if (err.name === "JsonWebTokenError") err = jsonWebTokenErrorHandler(err);
    if (err.name === "TokenExpiredError") error = tokenErrorHandler();
    sendErrorProd(err, res);
  }
};
