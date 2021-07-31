import "vite/dynamic-import-polyfill";
import "./scss/main.scss";
import { imageSlide } from "./js/overlayImage";
import { sortFunction } from "./js/sortElement";

(function init() {
  imageSlide();
  sortFunction();
})();
