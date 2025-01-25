const { filterRepoData } = require("../utils/filterData");
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

  const starsEarned = calcTotalStars(repos);
  const topStarredRepos = filterRepoData(
    totalRepos > 5 ? sortedRepos.slice(0, 6) : sortedRepos
  );
  console.log(topStarredRepos);

  const topCommitedRepos = [];

  return {
    totalRepos,
    starsEarned,
    topStarredRepos,
    topCommitedRepos,
  };
};

module.exports = repoSummerizer;
