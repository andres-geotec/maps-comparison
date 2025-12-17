import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { getCenter, zoom } from './main.js';
// import { defaults as interactionsDefaults } from 'ol/interaction';

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
    projection: 'EPSG:4326'
  }),
  controls: [],
  interactions: [],
});
