const responseHandler = (req, res, next) => {
  try {
    console.log(`middleware - RESPONSE HANDLER`);
    res.status(200).json(req.data);
  } catch (err) {
    next(err);
  }
};

export { responseHandler };
