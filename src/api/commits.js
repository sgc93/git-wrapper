const axios = require("axios");

const getCommitsForDateRange = async (username, token, startDate, endDate) => {
  const url = `https://api.github.com/search/commits?q=author:${username}+author-date:${startDate}..${endDate}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.cloak-preview+json",
  };

  const response = await axios.get(url, { headers });
  return response.data.total_count;
};

const getCommitsBetween = async (username, token, year) => {
  let totalCommits = 0;
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const commits = await getCommitsForDateRange(
    username,
    token,
    startDate,
    endDate
  );
  totalCommits = commits;

  return totalCommits;
};

module.exports = getCommitsBetween;
