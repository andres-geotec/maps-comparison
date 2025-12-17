import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from 'maplibre-gl';
import { getCenter, zoom } from "./main.js";

const libreMap = new Map({
  container: 'map-libre', // container id
  // style: 'https://demotiles.maplibre.org/globe.json', // style URL
  style: 'https://tiles.openfreemap.org/styles/bright', // style URL
  center: getCenter(), // starting position [lng, lat]
  zoom: zoom-1.08, // starting zoom
  interactive: false,
});
