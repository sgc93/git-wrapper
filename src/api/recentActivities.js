const { default: axios } = require("axios");

const filterEvent = (events) => {
  return events.map((event) => {
    switch (event.type) {
      case "PushEvent":
        return {
          type: event.type,
          repo: event.repo.name,
          branch: event.payload.ref.replace("refs/heads/", ""),
          commits: event.payload.commits.map((commit) => commit.message),
          timestamp: event.created_at,
        };
      case "PublicEvent":
        return {
          type: event.type,
          repo: event.repo.name,
          timestamp: event.created_at,
        };
      case "WatchEvent":
        return {
          type: event.type,
          repo: event.repo.name,
          action: event.payload.action,
          timestamp: event.created_at,
        };
      default:
        return {};
    }
  });
};

const recentActivities = async (username, token) => {
  try {
    const url = `https://api.github.com/users/${username}/events/public`;
    const headers = token ? { headers: `token ${token}` } : {};
    const response = await axios.get(url, { headers });
    return {
      success: true,
      data: {events: filterEvent(response.data.slice(0, 10))}
    }
  } catch (error) {
    if (error.response) {
      return customError(error);
    }

    return unknowError(error);
  }
};

module.exports = recentActivities;
