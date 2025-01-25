const { getRepoLngs } = require("../api/repos");

const getTopLng = (lngCoverage) => {
  let topCoverage = 0;
  let toplngName = "";

  for (let [lng, coverage] of Object.entries(lngCoverage)) {
    coverage = parseFloat(coverage);
    if (topCoverage < coverage) {
      toplngName = lng;
      topCoverage = coverage;
    }
  }

  return { lngName: toplngName, lngCoverage: topCoverage };
};

const getTopLanguages = (lngCoverage) => {
  const lngCoverages = Object.entries(lngCoverage);
  const sortedLngCoverage = lngCoverages.sort(
    (a, b) => parseFloat(b[1]) - parseFloat(a[1])
  );

  const topFive =
    sortedLngCoverage.length > 3
      ? sortedLngCoverage.slice(0, 3)
      : sortedLngCoverage;
  const topFiveCoverages = {};
  for (const [lng, coverage] of topFive) {
    topFiveCoverages[lng] = coverage;
  }

  return topFiveCoverages;
};

const getLngPerRepo = (repos) => {
  const lngRepoCoverage = {};
  for (const repo of repos) {
    if (lngRepoCoverage[repo.language]) {
      lngRepoCoverage[repo.language] += 1;
    } else {
      lngRepoCoverage[repo.language] = 1;
    }
  }

  return lngRepoCoverage;
};

const lngSummerizer = async (repos, token) => {
  const lngStats = {};
  let totalCodeSize = 0;

  try {
    for (const repo of repos) {
      const languages = await getRepoLngs(repo.url, token);
      for (const [language, bytes] of Object.entries(languages)) {
        if (!lngStats[language]) {
          lngStats[language] = 0;
        }

        lngStats[language] += bytes;
        totalCodeSize += bytes;
      }
    }

    const lngs = Object.entries(lngStats);
    const totalLngs = lngs.length;
    const lngCoverage = {};

    for (const [lng, bytes] of lngs) {
      lngCoverage[lng] = ((bytes / totalCodeSize) * 100).toFixed(2);
    }

    const topLanguage = getTopLng(lngCoverage);
    const lngRepoCoverage = getLngPerRepo(repos);
    const topThreeLanguages = getTopLanguages(lngCoverage);

    return {
      totalLngs,
      topThreeLanguages,
      lngCoverage,
      lngRepoCoverage,
      topLanguage,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = lngSummerizer;
