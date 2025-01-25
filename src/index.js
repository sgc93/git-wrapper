const getAllRepos = require("./api/repos");
const { getUserProfile } = require("./api/profile");
const repoSummerizer = require("./core/repoSummerizer");

async function gitWrapped(username, token) {
  try {
    const profile = await getUserProfile(username, token);
    const repos = await getAllRepos(username, token);
    const { totalRepos, starsEarned, topStarredRepos, topCommitedRepos } =
      repoSummerizer(repos);

    return {
      profile,
      stats: {
        totalRepos,
        starsEarned,
        privateRepos: totalRepos - profile.publicRepos,
        publicRepos: profile.publicRepos,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { gitWrapped };
