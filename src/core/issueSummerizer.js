const { default: axios } = require("axios");

const issueSummerizer = async (username, token) => {
  try {
    const url = `https://api.github.com/search/issues?q=author:${username}+type:issue`;
    const headers = token ? { headers: `token ${token}` } : {};

    const response = await axios.get(url, { headers });
    const issues = response.data.total_count;

    return issues;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = issueSummerizer;
