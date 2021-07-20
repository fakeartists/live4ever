const settings = {};

// global
settings.resizeDebounceTime = 10; // in ms
settings.isDevelopment = process.env.NODE_ENV !== 'production';

//dates
settings.startDate = process.env.REACT_APP_STARTDATE;

// global paths
settings.sitePath = process.env.REACT_APP_PUBLIC_URL;
settings.assetPath = `${settings.sitePath}/assets/`;
settings.imagesPath = `${settings.sitePath}/assets/images/`;
settings.apiUrl = process.env.REACT_APP_API_URL;
settings.apiDataEndpoint = process.env.REACT_APP_API_DATA_ENDPOINT;
settings.bidBase = process.env.REACT_APP_BID_BASE;

// Webgl
settings.datGui = settings.isDevelopment && true;
settings.renderStats = false;
settings.webglHelpers = settings.isDevelopment && true;
settings.useShadows = false;
settings.changeOnMoveMouse = true;
settings.autoUpdateBlendShapes = true;

//google connect
settings.clientID = process.env.REACT_APP_CLIENT_ID;

export default settings;
