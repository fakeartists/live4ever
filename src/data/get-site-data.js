import { getUsersData, getUserData, writeUserData } from './api/api';
import copydata_en from './copy/copy-en';

//temp
import assetdata from './assets';

//ads
import adsdata from './ads';

//ads
import leaderboarddata from './leaderboard';

const copydata = {
  en: copydata_en
};

export async function updateUser(id, name, bid, level, email, image = '', status = 'bid') {
  const response = await writeUserData(id, name, bid, level, email, image, status);
  return response;
}

export async function getUser(id) {
  const userData = await getUserData(id);
  return userData;
}

export async function getUsers() {
  const userData = await getUsersData();
  return userData;
}

export async function getLeaderboard(id) {
  let leaderboardData = [];
  if (leaderboarddata.hasOwnProperty(id)) {
    leaderboardData = leaderboarddata[id];
  }
  return leaderboardData;
}

export async function getData(id = undefined) {
  let assetData = {};
  try {
    const data = assetdata; //await getSiteData().catch(connectionError('data'));
    if (id !== undefined) assetData = data.filter(item => item._id === id)[0];
    else assetData = data;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  return assetData;
}

export function getAds() {
  return adsdata;
}

export function getCopy(language, session) {
  if (copydata.hasOwnProperty(language) && copydata[language].hasOwnProperty(session)) {
    return copydata[language][session];
  } else {
    return null;
  }
}
