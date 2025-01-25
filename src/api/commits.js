const axios = require("axios");
const { throwErrorMessage } = require("../utils/format");
const GitWrapperError = require("../model/GitWrapperError");

const getCommitsBetween = async (username, token, year) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  try {
    const url = `https://api.github.com/search/commits?q=author:${username}+author-date:${startDate}..${endDate}`;
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.cloak-preview+json"
        }
      : {};

    const response = await axios.get(url, { headers });
    const totalCommits = response.data.total_count;

    return totalCommits;
  } catch (error) {
    if (error.response) {
      throwErrorMessage(error.response.status, error);
    } else {
      throw new GitWrapperError(
        "NETWORK_ERROR",
        "A network error occurred. Please check your internet connection.",
        error.message
      );
    }
  }
};

module.exports = getCommitsBetween;
