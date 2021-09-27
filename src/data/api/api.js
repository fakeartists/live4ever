import { initializeApp } from '@firebase/app';
import { getDatabase, ref, child, get, set } from '@firebase/database';
import { getAnalytics } from '@firebase/analytics';

import axios from 'axios';
import settings from '../settings';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const writeUserData = async (id, name, bid, level, email, image = '', status = 'bid') => {
  const db = getDatabase();
  const time = Date.now();
  const user = await getUserData(id);

  bid = user.bid > bid ? user.bid : bid;
  level = user.level > level ? user.level : level;

  try {
    await set(ref(db, 'users/' + id), {
      _id: id,
      email: email,
      bid: bid,
      level: level,
      image: image,
      name: name,
      time: time,
      status: status
    });

    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

export const getUserData = async id => {
  let returndata = null;
  const usersData = await get(child(ref(getDatabase()), `users/` + id));
  if (usersData.exists()) {
    returndata = usersData.val();
  }
  return returndata;
};

export const getUsersData = async () => {
  let returndata = null;
  const usersData = await get(child(ref(getDatabase()), `users`));
  if (usersData.exists()) {
    returndata = usersData.val();
  }
  return returndata;
};

export const getData = async endpoint => {
  const url = `${settings.apiUrl}${endpoint}`;
  const { data } = await axios.get(url);
  return data;
};

export const postData = async (endpoint, body) => {
  const url = `${settings.apiUrl}${endpoint}`;
  const { data } = await axios.post(url, body);
  return data;
};

export const getSiteData = async () => {
  return getData(settings.apiDataEndpoint);
};

export const connectionError = endpoint => error => {
  throw new Error(`Connection error requesting "${endpoint}": ${error.message}`);
};
