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

const n = 0.1;

export default {
  up: () => {
    libreMap.setCenter({
      lng: libreMap.getCenter().lng,
      lat: libreMap.getCenter().lat + n,
    });
  },
  down: () => {
    libreMap.setCenter({
      lng: libreMap.getCenter().lng,
      lat: libreMap.getCenter().lat - n,
    });
  },
  left: () => {
    libreMap.setCenter({
      lng: libreMap.getCenter().lng - n,
      lat: libreMap.getCenter().lat,
    });
  },
  right: () => {
    libreMap.setCenter({
      lng: libreMap.getCenter().lng + n,
      lat: libreMap.getCenter().lat,
    });
  },
  in: () => {
    libreMap.setZoom(
      libreMap.getZoom() + 1
    );
  },
  out: () => {
    libreMap.setZoom(
      libreMap.getZoom() - 1
    );
  },
};
