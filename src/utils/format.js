const GitWrapperError = require("../model/GitWrapperError");

const throwErrorMessage = (status, error) => {
  switch (status) {
    case 401:
      throw new GitWrapperError(
        "UNAUTHORIZED",
        "Invalid token or unauthorized access",
        error.response.data
      );
    case 403:
      throw new GitWrapperError(
        "RATE_LIMIT_EXCEEDED",
        "Rate limit exceeded. Please wait before making more requests.",
        error.response.data
      );
    case 404:
      throw new GitWrapperError(
        "NOT_FOUND",
        "The requested resource was not found",
        error.response.data
      );
    default:
      throw new GitWrapperError(
        "GITHUB_API_ERROR",
        "An error occurred while interacting with the GitHub API",
        error.response.data
      );
  }
};

const getErrorMessage = (status) => {
  switch (status) {
    case 401:
      return {
        code: "UNAUTHORIZED",
        message: "Invalid token or unauthorized access"
      };
    case 403:
      return {
        code: "RATE_LIMIT_EXCEEDED",
        message: "Rate limit exceeded. Please wait before making more requests."
      };
    case 404:
      return {
        code: "NOT_FOUND",
        message: "The requested resource was not found"
      };
    default:
      return {
        code: "GITHUB_API_ERROR",
        message: "An error occurred while interacting with the GitHub API"
      };
  }
};

module.exports = { throwErrorMessage, getErrorMessage };
