import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat, toLonLat } from 'ol/proj'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import MVT from 'ol/format/MVT'
import { TileWMS } from 'ol/source'

export class OpenLayers extends Map {
  constructor(type, center, zoom, capa, move) {
    const container = `openlayers-${type}`

    const olView = new View({
      center: fromLonLat(center, 'EPSG:3857'),
      zoom: zoom,
    })

    const changeView = ({ target }) => move({
      center: toLonLat(target.getCenter(), 'EPSG:3857'),
      zoom: target.getZoom(),
      from: container,
    })

    olView.on('change:center', changeView)
    olView.on('change:resolution', changeView)
    // olView.on('change:rotation', changeView)

    let layer
    if (type === 'mvt') {
      layer = new VectorTileLayer({
        declutter: true,
        source: new VectorTileSource({
          format: new MVT(),
          url: `${import.meta.env.VITE_MARTIN_URL}/${capa}/{z}/{x}/{y}`,
        }),
      })
    }
    if (type === 'wms') {
      layer = new TileLayer({
        source: new TileWMS({
          url: `${import.meta.env.VITE_GEOSERVER_URL}/ows`,
          params: {
            LAYERS: capa,
            TILED: true,
          },
        }),
      })
    }

    super({
      target: container,
      view: olView  ,
      layers: [
        new TileLayer({ source: new OSM() }),
        layer,
      ],
      controls: [],
    })

    this.id = container
  }

  setCenter(center) {
    this.getView().setCenter(fromLonLat(center, 'EPSG:3857'))
  }

  setZoom(zoom) {
    this.getView().setZoom(zoom)
  }
}
