import L from 'leaflet'
import 'leaflet.vectorgrid'

export const name = 'leaflet'

export class Leaflet {
  constructor(center, zoom, url_capa, move) {
    this.map = L.map('map-leaflet', {
      center: L.latLng(center[1], center[0]),
      zoom,
      layers: [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        L.vectorGrid.protobuf(`${url_capa}/{z}/{x}/{y}` , {
          vectorTileLayerStyles: {
            polygons: {
              fill: true,
              fillColor: '#ffffff',
              // fillOpacity: 0.6,
              color: '#3399CC',
              weight: 5,
            },
          },
        }),
      ],
    })

    function changeView({ target }) {
      const { lng, lat } = target.getCenter()
      move({
        center: [lng, lat],
        zoom: target.getZoom(),
        from: name,
      })
    }

    this.map.on('move', changeView)
  }
  
  setCenter(center) {
    // console.log(this.map.setView, center, L.latLng);
    
    // this.map.setView(L.latLng(center[1], center[0]))
    // this.map.setView(center)
    // console.log(this.map);
  }

  setZoom(zoom) {
    this.map.setZoom(zoom)
  }
}
