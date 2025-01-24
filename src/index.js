const axios = require("axios");

async function getUserInfo(username, token) {
  console.log(token);
  try {
    const url = `https://api.github.com/users/${username}`;

    const headers = token ? { Authorization: `token ${token}` } : {};

    const response = await axios.get(url, { headers });

    const { login, name, bio, location, company, avatar_url, created_at } =
      response.data;

    return {
      username: login,
      name,
      bio,
      location,
      company,
      avatarUrl: avatar_url,
      accountCreated: created_at,
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`User "${username}" not found.`);
    } else if (error.response && error.response.status === 403) {
      throw new Error(
        "Rate limit exceeded. Use a personal access token for higher limits."
      );
    }
    throw new Error("An error occurred while fetching user information.");
  }
}

module.exports = { getUserInfo };
