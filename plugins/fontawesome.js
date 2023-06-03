import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFile,
  faCirclePlay,
  faImage,
  faUser,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faTwitter,
  faTiktok,
  faFacebook,
  faInstagram,
  faSpotify,
  faSoundcloud,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faFile,
  faCirclePlay,
  faImage,
  faUser,
  faHeart,
  faTwitter,
  faTiktok,
  faFacebook,
  faInstagram,
  faSpotify,
  faSoundcloud,
  faYoutube
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
