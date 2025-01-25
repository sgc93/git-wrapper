const { sortReposByStars } = require("../utils/sort");
const calcTotalStars = (repos) => {
  let stars = 0;
  repos.forEach((repo) => {
    stars = stars + repo.stargazers_count;
  });

  return stars;
};

const repoSummerizer = (repos) => {
  const sortedRepos = sortReposByStars(repos);
  const totalRepos = sortedRepos.length;
  const topStarredRepos = sortedRepos.slice(0, 18);
  const topCommitedRepos = [];
  const starsEarned = calcTotalStars(repos);

  return {
    totalRepos,
    starsEarned,
    topStarredRepos,
    topCommitedRepos,
  };
};

module.exports = repoSummerizer;
