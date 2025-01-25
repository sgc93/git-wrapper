const { default: axios } = require("axios");
const { unknowError, customError } = require("../utils/error");

const pullRequestSummerizer = async (username, token) => {
  try {
    const url = `https://api.github.com/search/issues?q=author:${username}+type:pr`;
    const headers = token ? { headers: `Bearer ${token}` } : {};

    const response = await axios.get(url, { headers });
    const pullRequests = response.data.total_count;

    return {
      success: true,
      data: { pullRequests }
    };
  } catch (error) {
    if (error.response) {
      return customError(error);
    }

    return unknowError(error);
  }
};

module.exports = pullRequestSummerizer;
