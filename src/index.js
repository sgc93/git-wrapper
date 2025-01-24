const { getUserProfile } = require("./core/profile");

async function gitWrapped(username, token) {
  try {
    const profile = await getUserProfile(username, token);
    return { profile };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { gitWrapped };
