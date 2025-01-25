const unknowError = (err) => {
  return {
    success: false,
    error: {
      code: "UNKNOWN_ERROR",
      message: "An unknown error occurred",
      details: err.message
    }
  };
};

module.exports = unknowError;
