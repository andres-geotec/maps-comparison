import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { getCenter, zoom } from "./main.js";

const olMap = new Map({
  target: 'map-ol',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: getCenter(),
    zoom: zoom,
    // extent: [-118.3651,14.5321,-86.7104,32.7187],
    projection: 'EPSG:4326'
  })
});
