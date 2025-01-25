const { getRepoIssues } = require("../api/repos");

const issueSummerizer = async (repos, token) => {
  try {
    let issues = 0;
    for (const repo of repos) {
      const repoIssues = await getRepoIssues(repo.url, token);
      issues += repoIssues;
    }

    return issues;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = issueSummerizer;
