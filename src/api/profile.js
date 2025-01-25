const axios = require("axios");
const { getErrorMessage } = require("../utils/format");
const unknowError = require("../utils/unknownError");

const getUserProfile = async (username, token) => {
  try {
    const url = `https://api.github.com/users/${username}`;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
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
      following
    } = response.data;

    return {
      success: true,
      data: {
        id,
        username: login,
        name,
        bio,
        location,
        company,
        avatarUrl: avatar_url,
        created_at,
        url: html_url,
        type,
        blogUrl: blog,
        email,
        hireable,
        followers,
        following,
        publicRepos: public_repos,
        publicGists: public_gists
      }
    };
  } catch (error) {
    if (error.response) {
      const err = getErrorMessage(error.response.status);
      return {
        success: false,
        error: {
          code: err.code,
          message: err.message,
          details: error.response.data
        }
      };
    } else {
      return unknowError(error);
    }
  }
};

module.exports = { getUserProfile };
