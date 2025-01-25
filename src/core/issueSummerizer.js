const { default: axios } = require("axios");
const { getErrorMessage } = require("../utils/format");
const unknowError = require("../utils/unknownError");

const issueSummerizer = async (username, token) => {
  try {
    const url = `https://api.github.com/search/issues?q=author:${username}+type:issue`;
    const headers = token ? { headers: `Bearer ${token}` } : {};

    const response = await axios.get(url, { headers });
    const issues = response.data.total_count;

    return {
      success: true,
      data: { issues }
    };
  } catch (error) {
    if (error.response) {
      const err = getErrorMessage(error.response.status);
      return {
        success: false,
        error: {
          code: err.code,
          message: err.message,
          details: error.response.data
        }
      };
    }

    return unknowError(error);
  }
};

module.exports = issueSummerizer;
