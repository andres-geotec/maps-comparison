import olMap from "./ol.js";
import libreMap from "./map-libre";

document.getElementById('⬆️').addEventListener('click', () => {
  libreMap.view()
  olMap.view()
});