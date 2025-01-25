const axios = require("axios");

const getAllRepos = async (username, token) => {
  const repos = [];
  let page = 1;
  let fetching = true;
  const url = `https://api.github.com/${
    token ? "user" : `users/${username}`
  }/repos`;
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
  const params = {
    page: page,
    per_page: 100,
  };

  while (fetching) {
    try {
      const response = await axios.get(url, { headers, params });

      repos.push(...response.data);
      if (response.data.length < 100) {
        fetching = false;
      } else {
        page++;
      }
    } catch (error) {
      fetching = false;
      throw new Error("Error fetching repositories:", error.message);
    }
  }

  return repos;
};

module.exports = getAllRepos;
