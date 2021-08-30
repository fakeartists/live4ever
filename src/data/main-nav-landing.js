import routeKeys from '../routes/keys';
import settings from './settings';
import logo from '../assets/images/logo_pyramid.png';

export default {
  logoSrc: logo,
  logoLink: routeKeys.Home,
  links: [
    {
      text: 'text_more',
      path: settings.subscribelink
    }
  ]
};
