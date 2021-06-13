import axios from 'axios';
import settings from '../settings';

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
