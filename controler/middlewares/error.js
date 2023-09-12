class errorHandler extends Error {
  // own made class for status code transfer.
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errormiddleware = () => {
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  return res.statusCode(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default errorHandler;
