export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    error: err.message || "Error interno del servidor"
  });
};
