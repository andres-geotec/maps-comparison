import { Map } from 'maplibre-gl';
import { url_capa, center, zoom } from "./main.js";
import * as olMap from "./ol.js";

const libreMap = new Map({
  container: 'map-libre',
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: [
          "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors"
      },
    },
    layers: [
      {
        id: "osm-base",
        type: "raster",
        source: "osm"
      },
    ],
  },
  center: center,
  zoom: zoom-1,
});

// libreMap.on('load', function () {
//   libreMap.addSource('martin-service', {
//     'type': 'vector',
//     'tiles': [
//       url_capa
//     ],
//   });

//   libreMap.addLayer({
//     'id': 'nombre-de-mi-capa-poligonos',
//     'type': 'fill',
//     'source': 'martin-service',
//     'source-layer': 'catastro_cdmx',
//     'layout': {},
//     'paint': {
//       'fill-color': '#0080ff',
//       // 'fill-opacity': 0.5,
//       'fill-outline-color': '#000000',
//     },
//   });
// });

// console.log('libreMap', libreMap.getCenter());
libreMap.on('move', () => {
  const { lng, lat } = libreMap.getCenter();
  // console.log('moviendo', { lng, lat });
  olMap.setCenter([lng, lat]);
})
libreMap.on('zoom', () => {
  // console.log('moviendo', libreMap.getZoom());
  olMap.setZoom(libreMap.getZoom());
})

export function setCenter(newCenter) {
  libreMap.setCenter(newCenter);
}
export function setZoom(newZoom) {
  libreMap.setZoom(newZoom);
}

// const n = 0.1;
// export default {
//   up: () => {
//     libreMap.setCenter({
//       lng: libreMap.getCenter().lng,
//       lat: libreMap.getCenter().lat + n,
//     });
//   },
//   down: () => {
//     libreMap.setCenter({
//       lng: libreMap.getCenter().lng,
//       lat: libreMap.getCenter().lat - n,
//     });
//   },
//   left: () => {
//     libreMap.setCenter({
//       lng: libreMap.getCenter().lng - n,
//       lat: libreMap.getCenter().lat,
//     });
//   },
//   right: () => {
//     libreMap.setCenter({
//       lng: libreMap.getCenter().lng + n,
//       lat: libreMap.getCenter().lat,
//     });
//   },
//   in: () => {
//     libreMap.setZoom(
//       libreMap.getZoom() + 1
//     );
//   },
//   out: () => {
//     libreMap.setZoom(
//       libreMap.getZoom() - 1
//     );
//   },
// };
