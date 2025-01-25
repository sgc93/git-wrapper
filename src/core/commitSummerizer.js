const getCommitsBetween = require("../api/commits");
const GitWrapperError = require("../model/GitWrapperError");
const unknowError = require("../utils/unknownError");

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
      success: true,
      data: {
        totalCommits,
        commitsPerYear
      }
    };
  } catch (error) {
    if (error instanceof GitWrapperError) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        }
      };
    }

    return unknowError(error);
  }
};

module.exports = commitSummerizer;
