const GitWrapperError = require("../model/GitWrapperError");
const { unknowError } = require("../utils/error");
const { throwErrorMessage } = require("../utils/format");
const axios = require("axios");

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

const getRepoLngs = async (repoUrl, token) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${repoUrl}/languages`, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      throwErrorMessage(error.response.status, error);
    } else {
      throw new GitWrapperError(
        "NETWORK_ERROR",
        "A network error occurred. Please check your internet connection.",
        error.message
      );
    }
  }
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

    /*
     *  Estimated LOC = Code size in bytes / Average bytes per line
     *  Let Average Bytes per Line =  70 bytes/line
     *
     */
    const loc = Math.ceil(totalCodeSize / 70);

    for (const [lng, bytes] of lngs) {
      lngCoverage[lng] = ((bytes / totalCodeSize) * 100).toFixed(2);
    }

    const topLanguage = getTopLng(lngCoverage);
    const lngRepoCoverage = getLngPerRepo(repos);
    const topThreeLanguages = getTopLanguages(lngCoverage);

    return {
      success: true,
      data: {
        totalLineOfCode: loc,
        totalLngs,
        topThreeLanguages,
        lngCoverage,
        lngRepoCoverage,
        topLanguage
      }
    };
  } catch (error) {
    if (error instanceof GitWrapperError) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        }
      };
    }

    return unknowError(error);
  }
};

module.exports = lngSummerizer;
