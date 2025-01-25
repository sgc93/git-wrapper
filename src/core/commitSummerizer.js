const { getRepoCommits } = require("../api/repos");

const commitSummerizer = async (repos, username, token) => {
  const commitsPerYear = {};
  let totalCommits = 0;

  try {
    for (const repo of repos) {
      const commits = await getRepoCommits(repo.url, username, token);
      for (const commit of commits) {
        const newDate = new Date(commit.date);
        const year = newDate.getFullYear();

        if (!commitsPerYear[year]) {
          commitsPerYear[year] = 0;
        }

        commitsPerYear[year] += 1;
        totalCommits += 1;
      }
    }

    return {
      totalCommits,
      commitsPerYear,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = commitSummerizer;
