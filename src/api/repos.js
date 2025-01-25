const axios = require("axios");



const getRepoLngs = async (repoUrl, token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${repoUrl}/languages`, { headers });
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching repo languages");
  }
};


const getAllRepos = async (username, token) => {
  const repos = [];
  let page = 1;
  let fetching = true;
  const url = `https://api.github.com/${
    token ? "user/repos" : `users/${username}/repos`
  }`;

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

module.exports = { getAllRepos, getRepoLngs };
