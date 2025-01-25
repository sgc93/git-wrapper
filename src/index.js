const { getUserProfile } = require("./api/profile");
const commitSummerizer = require("./core/commitSummerizer");

async function gitWrapped(username, token) {
  const profile = await getUserProfile(username, token);
  if (profile.success) {
    return {
      success: true,
      profile: profile.data,
      methods: {
        commitSummerizer
      }
    };
  } else {
    return { ...profile };
  }
}

module.exports = { gitWrapped, commitSummerizer, getUserProfile };
