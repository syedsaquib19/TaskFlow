export const notFound = (req, res, next) => {
  res.status(404).json({ status: "fail", message: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const payload = {
    status: `${status}`.startsWith("4") ? "fail" : "error",
    message: err.message || "Something went wrong",
  };
  if (process.env.NODE_ENV !== "production") payload.stack = err.stack;
  res.status(status).json(payload);
};
