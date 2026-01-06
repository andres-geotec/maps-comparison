import { Map } from 'maplibre-gl'
import { url_geoserver, url_martin } from "./config"

export class MapLibre extends Map {
  constructor(type, center, zoom, capa, move) {
    const container = `maplibre-${type}`

    const source = {}    
    const layers = []

    if (type === 'mvt') {
      source['catastro'] = {
        type: 'vector',
        url: `${url_martin}/${capa}`,
      }
      layers.push({
        id: 'catastro-fill',
        type: 'fill',
        source: 'catastro',
        'source-layer': 'catastro_cdmx',
        paint: {
          'fill-color': '#ffffff',
          'fill-opacity': 0.4,
        },
      })
      layers.push({
        id: 'catastro-line',
        type: 'line',
        source: 'catastro',
        'source-layer': 'catastro_cdmx',
        paint: {
          'line-color': '#3399CC',
          'line-width': 1.25,
        },
      })
    }
    if (type === 'wms') {
      source['wms-test-source'] = {
        type: 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://maplibre.org/maplibre-style-spec/sources/
        tiles: [
          `${url_geoserver}/ows?service=WMS&request=GetMap&version=1.1.1&layers=${capa}&styles=&format=image%2Fpng&transparent=true&info_format=text%2Fhtml&tiled=false&srs=EPSG:3857&bbox={bbox-epsg-3857}&width=256&height=256`
        ],
        tileSize: 256
      }
      layers.push({
        id: 'wms-test-layer',
        type: 'raster',
        source: 'wms-test-source',
        paint: {},
      })
    }

    super({
      container,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
          ...source,
        },
        layers: [
          {
            id: 'osm-base',
            type: 'raster',
            source: 'osm',
          },
          ...layers,
        ],
      },
      center: center,
      zoom: zoom-1,
    })

    function changeView({ target }) {
      const { lng, lat } = target.getCenter()
      move({
        center: [lng, lat],
        zoom: target.getZoom() + 1,
        from: container,
      })
    }

    this.id = container

    this.on('move', changeView)
    this.on('zoom', changeView)
  }
}
