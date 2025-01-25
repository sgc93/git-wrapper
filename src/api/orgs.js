const { default: axios } = require("axios");

const orgs = async (username, token) => {
  try {
    const url = `https://api.github.com/users/${username}/orgs`;
    const headers = token ? { headers: `token ${token}` } : {};
    const response = await axios.get(url, { headers });
    return response.data.length;
  } catch (error) {
    throw new Error("Error while trying to fetch recent activities.");
  }
};

module.exports = orgs;
