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

const customError = (error) => {
  const err = getErrorMessage(error.response.status);
  return {
    success: false,
    error: {
      code: err.code,
      message: err.message,
      details: error.response.data
    }
  };
};

module.exports = { unknowError, customError };
