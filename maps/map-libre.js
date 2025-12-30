import { Map } from 'maplibre-gl';

export const name = 'maplibre'

export class MapLibre extends Map {
  constructor(center, zoom, url_capa, move) {
    super({
      container: 'map-libre',
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
          catastro: {
            type: 'vector',
            url: url_capa,
          },
        },
        layers: [
          {
            id: 'osm-base',
            type: 'raster',
            source: 'osm',
          },
          {
            id: 'catastro-fill',
            type: 'fill',
            source: 'catastro',
            'source-layer': 'catastro_cdmx',
            paint: {
              'fill-color': '#ffffff',
              'fill-opacity': 0.4
            }
          },
          {
            id: 'catastro-line',
            type: 'line',
            source: 'catastro',
            'source-layer': 'catastro_cdmx',
            paint: {
              'line-color': '#3399CC',
              'line-width': 1.25
            }
          }
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
        from: name,
      })
    }

    this.on('move', changeView)
    this.on('zoom', changeView)
  }
}
