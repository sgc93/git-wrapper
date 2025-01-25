const { default: axios } = require("axios");
const { getErrorMessage } = require("../utils/format");
const { unknowError, customError } = require("../utils/error");

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
      return customError(error);
    }

    return unknowError(error);
  }
};

module.exports = issueSummerizer;
