import { Map } from 'maplibre-gl';
import { url_capa, getCenter, zoom } from "./main.js";

const libreMap = new Map({
  container: 'map-libre',
  style: 'https://tiles.openfreemap.org/styles/bright',
  center: getCenter(),
  zoom: zoom-1,
  interactive: false,
});

libreMap.on('load', function () {
  libreMap.addSource('martin-service', {
    'type': 'vector',
    'tiles': [
      url_capa
    ],
  });

  libreMap.addLayer({
    'id': 'nombre-de-mi-capa-poligonos',
    'type': 'fill',
    'source': 'martin-service',
    'source-layer': 'catastro_cdmx',
    'layout': {},
    'paint': {
      'fill-color': '#0080ff',
      // 'fill-opacity': 0.5,
      'fill-outline-color': '#000000',
    },
  });
});

export default {
  view: () => {
    libreMap.setCenter({
      lng: libreMap.getCenter().lng,
      lat: libreMap.getCenter().lat + 0.1,
    });
  },
};
