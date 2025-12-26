import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';

export class OpenLayers extends Map {
  constructor(center, zoom, url_capa, move) {
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
        new TileLayer({ source: new OSM() }),
        new VectorTileLayer({
          declutter: true,
          source: new VectorTileSource({
            format: new MVT(),
            url: `${url_capa}/{z}/{x}/{y}`,
          }),
        }),
      ],
      view: olView,
      controls: [],
    })
  }

  setCenter(center) {
    this.getView().setCenter(fromLonLat(center, 'EPSG:3857'))
  }

  setZoom(zoom) {
    this.getView().setZoom(zoom)
  }
}
