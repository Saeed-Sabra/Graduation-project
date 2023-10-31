function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ message: "This user is not authorized!" });
  }
  return res.status(500).json({ message: err });
}

module.exports = errorHandler;
