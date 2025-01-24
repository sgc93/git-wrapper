const axios = require("axios");

const getUserProfile = async (username, token) => {
  try {
    const url = `https://api.github.com/users/${username}`;
    const headers = token ? { Authorization: `token ${token}` } : {};
    const response = await axios.get(url, { headers });
    const {
      login,
      name,
      bio,
      location,
      company,
      avatar_url,
      created_at,
      id,
      html_url,
      type,
      blog,
      email,
      hireable,
      public_repos,
      public_gists,
      followers,
      following,
      twitter_username,
    } = response.data;

    return {
      id,
      username: login,
      name,
      bio,
      location,
      company,
      avatarUrl: avatar_url,
      accountCreated: created_at,
      url: html_url,
      type,
      blogUrl: blog,
      email,
      hireable,
      followers,
      following,
      publicRepos: public_repos,
      publicGists: public_gists,
      xUsername: twitter_username,
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
};

module.exports = { getUserProfile };
