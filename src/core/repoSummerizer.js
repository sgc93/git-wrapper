const { sortReposByStars } = require("../utils/sort");

const repoSummerizer = (repos) => {
  const sortedRepos = sortReposByStars(repos);
  const totalRepos = sortedRepos.length;
  const topStarredRepos = sortedRepos.slice(0, 18);
  const topCommitedRepos = [];

  return {
    totalRepos,
    topStarredRepos,
    topCommitedRepos,
  };
};

module.exports = repoSummerizer;
