const errorHandler = (err, req, res, next) => {
    let error = { ...err };
  
    error.message = err.message;
  
    // Log to console for dev
    if (nodeEnv !== "Test") {
      console.log(err);
    }
  
    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found`;
      error = new ErrorResponse(message, 404);
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new ErrorResponse(message, 400);
    }
  
    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new ErrorResponse(message, 400);
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.errorMsg || null,
      message: error.message || "Server Error",
      errorCode: error.errorCode || null,
    });
  };
  
  module.exports = errorHandler;