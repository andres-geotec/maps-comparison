import { Map } from 'maplibre-gl';

export class MapLibre extends Map {
  constructor(center, zoom, move) {
    super({
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
    })

    function changeView({ target }) {
      const { lng, lat } = target.getCenter()
      move({
        center: [lng, lat],
        zoom: target.getZoom(),
      })
    }

    this.on('move', changeView)
    this.on('zoom', changeView)
  }
}

// const libreMap = new Map({
//   container: 'map-libre',
//   style: {
//     version: 8,
//     sources: {
//       osm: {
//         type: "raster",
//         tiles: [
//           "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
//           "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
//           "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         ],
//         tileSize: 256,
//         attribution: "© OpenStreetMap contributors"
//       },
//     },
//     layers: [
//       {
//         id: "osm-base",
//         type: "raster",
//         source: "osm"
//       },
//     ],
//   },
//   center: center,
//   zoom: zoom-1,
// });

// // libreMap.on('load', function () {
// //   libreMap.addSource('martin-service', {
// //     'type': 'vector',
// //     'tiles': [
// //       url_capa
// //     ],
// //   });

// //   libreMap.addLayer({
// //     'id': 'nombre-de-mi-capa-poligonos',
// //     'type': 'fill',
// //     'source': 'martin-service',
// //     'source-layer': 'catastro_cdmx',
// //     'layout': {},
// //     'paint': {
// //       'fill-color': '#0080ff',
// //       // 'fill-opacity': 0.5,
// //       'fill-outline-color': '#000000',
// //     },
// //   });
// // });
