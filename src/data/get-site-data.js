import { getSiteData, connectionError } from './api/api';

export default async () => {
  const siteData = {};
  try {
    const data = await getSiteData().catch(connectionError('data'));
    siteData.data = data;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  return siteData;
};
