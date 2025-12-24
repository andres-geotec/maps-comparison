import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import { url_capa, center, zoom } from './main.js';
import * as libreMap from './map-libre.js';

const olView = new View({
  center: fromLonLat(center, 'EPSG:3857'),
  zoom: zoom,
});

const olMap = new Map({
  target: 'map-ol',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: olView,
  controls: [],
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

// let isSyncing = false
olView.on('change:center', () => libreMap.setCenter(toLonLat(olView.getCenter())));
olView.on('change:resolution', () => {
  // console.log('change:resolution', olView.getZoom());
  libreMap.setZoom(olView.getZoom());
});
// olView.on('change:rotation', movimiento);

export function setCenter(newCenter) {
  olView.setCenter(fromLonLat(newCenter));
}
export function setZoom(newZoom) {
  olView.setZoom(newZoom);
}

// const n = 11800;
// export default {
//   up: () => {
//     olMap.getView().setCenter([
//       olMap.getView().getCenter()[0],
//       olMap.getView().getCenter()[1] + n,
//     ]);
//   },
//   down: () => {
//     olMap.getView().setCenter([
//       olMap.getView().getCenter()[0],
//       olMap.getView().getCenter()[1] - n,
//     ]);
//   },
//   left: () => {
//     olMap.getView().setCenter([
//       olMap.getView().getCenter()[0] - n,
//       olMap.getView().getCenter()[1],
//     ]);
//   },
//   right: () => {
//     olMap.getView().setCenter([
//       olMap.getView().getCenter()[0] + n,
//       olMap.getView().getCenter()[1],
//     ]);
//   },
//   in: () => {
//     olMap.getView().setZoom(
//       olMap.getView().getZoom() + 1
//     );
//   },
//   out: () => {
//     olMap.getView().setZoom(
//       olMap.getView().getZoom() - 1
//     );
//   },
// };
