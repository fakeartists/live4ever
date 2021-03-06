import { device } from '@jam3/detect';

// TODO: replace this constant when adding global constants
const ASSETS_PATH = process.env.PUBLIC_URL + '/assets/';

/**
 * Manipulate preload assets list here
 *
 * @const {array} GLOBAL_ASSETS (Keep an assets list for across all platform)
 * @const {array} MOBILE_ASSETS (Keep an assets list for phone)
 * @const {array} TABLET_ASSETS (Keep an assets list for tablet)
 * @const {array} DESKTOP_ASSETS (Keep an assets list for desktop)
 */
const GLOBAL_ASSETS = [
  `${ASSETS_PATH}images/emojis.png`,
  `${ASSETS_PATH}sounds/mine/s_sfx_01.mp3`,
  `${ASSETS_PATH}sounds/mine/s_sfx_02.mp3`,
  `${ASSETS_PATH}sounds/mine/s_sfx_03.mp3`,
  `${ASSETS_PATH}sounds/mine/s_level_up.mp3`,
  `${ASSETS_PATH}sounds/mine/s_open.mp3`
];

const MOBILE_ASSETS = [];
const TABLET_ASSETS = [];
const DESKTOP_ASSETS = [];

export default [
  ...GLOBAL_ASSETS,
  ...(device.isPhone ? MOBILE_ASSETS : []),
  ...(device.isTablet ? TABLET_ASSETS : []),
  ...(device.isDesktop ? DESKTOP_ASSETS : [])
];
