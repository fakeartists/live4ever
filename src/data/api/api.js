import { initializeApp } from '@firebase/app';
import { getDatabase, ref, child, get } from '@firebase/database';

import axios from 'axios';
import settings from '../settings';

const firebaseConfig = {
  apiKey: 'AIzaSyB9kAYLT4KLg1dykI_tmkwKDFcqF6hyX_k',
  authDomain: 'live4ever-fb084.firebaseapp.com',
  databaseURL: 'https://live4ever-fb084-default-rtdb.firebaseio.com',
  projectId: 'live4ever-fb084',
  storageBucket: 'live4ever-fb084.appspot.com',
  messagingSenderId: '256707626407',
  appId: '1:256707626407:web:1386326dbcad4418726282',
  measurementId: 'G-8CM6893Q0V'
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
