import "vite/dynamic-import-polyfill";
import "./scss/main.scss";
import { imageSlide } from "./js/overlayImage";

(function init() {
  imageSlide();
})();
