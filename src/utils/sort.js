const sortReposByStars = (repos) => {
  return repos.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }

    return new Date(a.updated_at) - new Date(b.updated_at);
  });
};

module.exports = { sortReposByStars };
