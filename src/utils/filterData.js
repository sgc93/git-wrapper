const filterRepoData = (repos) => {
  let filteredList = [];
  repos.forEach((repo) => {
    const filteredRepo = {
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks,
      openIssues: repo.open_issues,
      url: repo.html_url,
    };
    filteredList.push(filteredRepo);
  });

  return filteredList;
};

module.exports = { filterRepoData };
