const { getAllRepos } = require("./api/repos");
const { getUserProfile } = require("./api/profile");
const repoSummerizer = require("./core/repoSummerizer");
const lngSummerizer = require("./core/lngSummerizer");
const commitSummerizer = require("./core/commitSummerizer");

async function gitWrapped(username, token) {
  try {
    // const profile = await getUserProfile(username, token);
    const repos = await getAllRepos(username, token);
    // const repoStatus = repoSummerizer(repos);
    // const langugeStatus = await lngSummerizer(repos, token);
    const commitStatus = await commitSummerizer(
      repos.slice(0, 2),
      username,
      token
    );

    return {
      commitStatus,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { gitWrapped };
