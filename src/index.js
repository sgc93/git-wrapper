const getOrgs = require("./api/orgs");
const { getUserProfile } = require("./api/profile");
const recentActivities = require("./api/recentActivities");
const commitSummerizer = require("./core/commitSummerizer");
const issueSummerizer = require("./core/issueSummerizer");
const lngSummerizer = require("./core/lngSummerizer");
const pullRequestSummerizer = require("./core/pullRequestSummerizer");
const repoSummerizer = require("./core/repoSummerizer");
const { getAllRepos } = require("./api/repos");

async function gitWrapped(username, token) {
  const profile = await getUserProfile(username, token);
  if (profile.success) {
    return {
      success: true,
      profile: profile.data,
      methods: {
        commitSummerizer,
        issueSummerizer,
        getOrgs,
        recentActivities,
        pullRequestSummerizer,
        lngSummerizer,
        repoSummerizer
      }
    };
  } else {
    return { ...profile };
  }
}

module.exports = {
  gitWrapped,

  commitSummerizer,
  getUserProfile,
  issueSummerizer,
  getOrgs,
  recentActivities,
  pullRequestSummerizer,
  lngSummerizer,
  repoSummerizer,
  getAllRepos
};
