const errorHandler = (error, req, res, next) => {
  let errorStatus = error.status;
  if (!errorStatus) {
    errorStatus = 404;
  }
  res.status(errorStatus).json(error.message);
};

export { errorHandler };
