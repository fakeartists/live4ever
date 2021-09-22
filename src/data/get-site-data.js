import { getUsersData, getUserData, writeUserData } from './api/api';
import copydata_en from './copy/copy-en';
import { getCookie } from '../util/cookies';

//temp
import assetdata from './assets';

//ads
import adsdata from './ads';

//ads
import leaderboarddata from './leaderboard';

const copydata = {
  en: copydata_en
};

var leaderboard = [];

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

export async function getLeaderboardByd(id) {
  let leaderboardData = [];
  if (leaderboarddata.hasOwnProperty(id)) {
    leaderboardData = leaderboarddata[id];
  }
  return leaderboardData;
}

export function getLeaderboardData() {
  return leaderboard;
}

export async function getLeaderboard(update = false, status = '', user = '') {
  if (update) {
    await updateLeaderboard(status, user);
  }
  return leaderboard;
}

export function getRank(bid = null) {
  const cookiedata = getCookie();
  const id = cookiedata.login.id;
  let index = leaderboard.findIndex(x => x._id === id);

  if (bid != null) {
    for (let i = index; i >= 0; i--) {
      const value = leaderboard[i].bid;
      if (bid >= value) {
        index = i;
      } else {
        break;
      }
    }
  }

  return index + 1;
}

export function getHighest() {
  const highest = leaderboard.length > 0 ? leaderboard[0].bid : 0;
  return highest;
}

export async function updateLeaderboard(status = '', user = '') {
  leaderboard = [];
  if (status === 'open') {
    let users = await getUsers();
    for (var idx in users) {
      if (users.hasOwnProperty(idx)) {
        leaderboard.push(users[idx]);
      }
    }
  } else {
    leaderboard = await getLeaderboardByd(user);
  }

  leaderboard.sort((a, b) => {
    return a.bid > b.bid ? -1 : 1;
  });
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
