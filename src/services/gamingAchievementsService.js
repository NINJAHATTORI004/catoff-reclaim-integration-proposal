// services/gamingAchievementsService.js

const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGamingAchievementsData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const achievementData = JSON.parse(proof[0].claimData.context).extractedParameters.achievement;

  // Process the extracted data
  const achievementValue = achievementData.match(/level=\\"([\d,]+)/)[1].replace(/,/g, '');

  // Extract additional relevant data from the proof
  const url = JSON.parse(proof[0].claimData.parameters).url;
  const matchurl = url.match(/user\/([^\/]+)/);
  const username = matchurl ? matchurl[1] : null;
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

  // Create a ReclaimServiceResponse object with the processed data
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, parseInt(achievementValue, 10), proof[0]);
};
