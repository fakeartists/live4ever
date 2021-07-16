//import { getSiteData, connectionError } from './api/api';
import copydata_en from './copy/copy-en';

//temp
import assetdata from './assets';

const copydata = {
  en: copydata_en
};

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

export function getCopy(language, session) {
  if (copydata.hasOwnProperty(language) && copydata[language].hasOwnProperty(session)) {
    return copydata[language][session];
  } else {
    return null;
  }
}
