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

const getRepoIssues = async (repoUrl, token) => {
  try {
    let issues = 0;
    let hasMore = true;
    let page = 1;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    while (hasMore) {
      const response = await axios.get(`${repoUrl}/issues`, {
        headers,
        params: {
          page,
          per_page: 100,
        },
      });

      issues += response.data.length;

      if (response.data.length === 0 || response.data.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return issues;
  } catch (error) {
    console.error(
      "Error fetching repo issues:",
      error.response || error.message || error
    );
    throw new Error("Error while fetching repo issues");
  }
};

const getRepoCommits = async (repoUrl, username, token) => {
  try {
    const totalRepoCommits = [];
    let hasMore = true;
    let page = 1;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    while (hasMore) {
      const response = await axios.get(`${repoUrl}/commits`, {
        headers,
        params: {
          author: username,
          page: page,
          per_page: 100,
        },
      });

      const commits = response.data.map((commit) => {
        return {
          date: commit.commit.author.date,
          message: commit.commit.message,
        };
      });

      if (commits.length > 0) {
        totalRepoCommits.push(...commits);
        if (commits.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    return totalRepoCommits;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching repo commits");
  }
};

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

module.exports = { getAllRepos, getRepoLngs, getRepoCommits, getRepoIssues };
