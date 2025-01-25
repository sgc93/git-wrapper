const { default: axios } = require("axios");

const pullRequestSummerizer = async (username, token) => {
  try {
    const url = `https://api.github.com/search/issues?q=author:${username}+type:pr`;
    const headers = token ? { headers: `Bearer ${token}` } : {};

    const response = await axios.get(url, { headers });
    const pr = response.data.total_count;

    return pr;
  } catch (error) {
    throw new Error("Error while tying to search for pull requests");
  }
};

module.exports = pullRequestSummerizer;
