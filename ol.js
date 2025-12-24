import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';

export class OpenLayers extends Map {
  constructor(center, zoom, move) {
    const olView = new View({
      center: fromLonLat(center, 'EPSG:3857'),
      zoom: zoom,
    })

    function changeView({ target }) {
      move({
        center: toLonLat(target.getCenter(), 'EPSG:3857'),
        zoom: target.getZoom(),
      })
    }

    olView.on('change:center', changeView)
    olView.on('change:resolution', changeView)
    // olView.on('change:rotation', changeView)

    super({
      target: 'map-ol',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: olView,
      controls: [],
    })
  }
}

// const layer = new VectorTileLayer({
//   declutter: true,
//   source: new VectorTileSource({
//     format: new MVT(),
//     url: url_capa,
//     // maxZoom: 14,
//     // projection: 'EPSG:4326',
//   }),
//   // background: '#d1d1d1',
//   style: {
//     'fill-color': '#0080ff',
//     // 'fill-opacity': 0.5,
//     'stroke-color': '#000000',
//     'stroke-width': 0.5,
//     // 'shape-opacity': 0.5,
//   },
// });
// olMap.addLayer(layer);
