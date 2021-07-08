import routeKeys from '../routes/keys';
import logo from '../assets/images/logo_pyramid.png';

export default {
  logoSrc: logo,
  logoLink: routeKeys.Home,
  links: [
    {
      text: 'Δ',
      path: 'login'
    },
    {
      text: 'Gallery',
      path: routeKeys.Gallery
    },
    {
      text: 'About',
      path: routeKeys.About
    },
    {
      text: 'Store',
      path: 'https://fakeartists.store'
    }
  ]
};
