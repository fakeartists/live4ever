import { medium as MEDIUM, large as LARGE } from '../data/layout.json';

export const MEDIUM_MEDIA_QUERY = `(min-width: ${MEDIUM}px)`;
export const LARGE_MEDIA_QUERY = `(min-width: ${LARGE}px)`;

const MEDIUM_MATCH_MEDIA = window.matchMedia(MEDIUM_MEDIA_QUERY);
const LARGE_MATCH_MEDIA = window.matchMedia(LARGE_MEDIA_QUERY);

export default {
  get xsmall() {
    return !this.small;
  },
  get small() {
    return !this.medium;
  },
  get medium() {
    return MEDIUM_MATCH_MEDIA.matches;
  },
  get large() {
    return LARGE_MATCH_MEDIA.matches;
  },
  get mlarge() {
    return LARGE_MATCH_MEDIA.matches;
  },
  get xlarge() {
    return LARGE_MATCH_MEDIA.matches;
  },
  get all() {
    return {
      xsmall: this.xsmall,
      small: this.small,
      medium: this.medium,
      large: this.large,
      mlarge: this.mlarge,
      xlarge: this.xlarge
    };
  }
};
