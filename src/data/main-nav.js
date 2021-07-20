import routeKeys from '../routes/keys';
import logo from '../assets/images/logo_pyramid.png';

export default {
  logoSrc: logo,
  logoLink: routeKeys.Home,
  links: [
    {
      text: 'text_login',
      path: 'login'
    },
    {
      text: 'text_gallery',
      path: routeKeys.Gallery
    },
    {
      text: 'text_about',
      path: routeKeys.About
    },
    {
      text: 'text_store',
      path: 'https://fakeartists.store'
    }
  ]
};
