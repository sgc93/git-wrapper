const getCommitsBetween = require("../api/commits");

const commitSummerizer = async (username, token, created_at) => {
  const commitsPerYear = {};
  let totalCommits = 0;

  try {
    const startYear = new Date(created_at).getFullYear();
    const currentYear = new Date().getFullYear();

    for (let year = startYear; year <= currentYear; year++) {
      const yearlyCommits = await getCommitsBetween(username, token, year);
      commitsPerYear[year] = yearlyCommits;
      totalCommits += yearlyCommits;
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
