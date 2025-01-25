const axios = require("axios");
const { sortReposByStars } = require("../utils/sort");
const { customError, unknowError } = require("../utils/error");

const getAllRepos = async (username, token) => {
  try {
    const repos = [];
    let page = 1;
    let fetching = true;
    const url = `https://api.github.com/${
      token ? "user/repos" : `users/${username}/repos`
    }`;

    const headers = token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {};
    const params = {
      page: page,
      per_page: 100
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

    return {
      success: true,
      data: { repos: sortReposByStars(repos) }
    };
  } catch (error) {
    if (error.response) {
      return customError(error);
    }

    return unknowError(error);
  }
};

module.exports = { getAllRepos };
