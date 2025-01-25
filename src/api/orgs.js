const { default: axios } = require("axios");
const { customError, unknowError } = require("../utils/error");

const getOrgs = async (username, token) => {
  try {
    const url = `https://api.github.com/users/${username}/orgs`;

    const headers = token ? { headers: `token ${token}` } : {};
    const response = await axios.get(url, { headers });
    return {
      success: true,
      data: {
        orgs: response.data.length
      }
    };
  } catch (error) {
    if (error.response) {
      return customError(error);
    }

    return unknowError(error);
  }
};

module.exports = getOrgs;
