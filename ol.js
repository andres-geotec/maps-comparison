import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';
// import { defaults as interactionsDefaults } from 'ol/interaction';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import { url_capa, getCenter, zoom } from './main.js';


const olMap = new Map({
  target: 'map-ol',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    // center: getCenter(),
    center: fromLonLat(getCenter(), 'EPSG:3857'),
    zoom: zoom,
    // projection: 'EPSG:4326',
  }),
  controls: [],
  interactions: [],
});

const layer = new VectorTileLayer({
  declutter: true,
  source: new VectorTileSource({
    format: new MVT(),
    url: url_capa,
    // maxZoom: 14,
    // projection: 'EPSG:4326',
  }),
  // background: '#d1d1d1',
  style: {
    'fill-color': '#0080ff',
    // 'fill-opacity': 0.5,
    'stroke-color': '#000000',
    'stroke-width': 0.5,
    // 'shape-opacity': 0.5,
  },
});
olMap.addLayer(layer);

export default {
  view: () => {
    olMap.getView().setCenter([
      olMap.getView().getCenter()[0],
      olMap.getView().getCenter()[1] + 11800,
    ]);
  },
};
