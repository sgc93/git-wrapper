const { getAllRepos } = require("./api/repos");
const { getUserProfile } = require("./api/profile");
const repoSummerizer = require("./core/repoSummerizer");
const lngSummerizer = require("./core/lngSummerizer");

async function gitWrapped(username, token) {
  try {
    const profile = await getUserProfile(username, token);
    const repos = await getAllRepos(username, token);
    const { totalRepos, starsEarned, topStarredRepos, topCommitedRepos } =
      repoSummerizer(repos);
    const {
      totalLngs,
      topThreeLanguages,
      lngCoverage,
      lngRepoCoverage,
      topLanguage,
    } = await lngSummerizer(repos, token);

    return {
      profile,
      stats: {
        totalRepos,
        starsEarned,
        privateRepos: totalRepos - profile.publicRepos,
        publicRepos: profile.publicRepos,
      },
      topRepos: topStarredRepos,
      languages: {
        totalLngs,
        topThreeLanguages,
        lngCoverage,
        lngRepoCoverage,
        topLanguage,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { gitWrapped };
