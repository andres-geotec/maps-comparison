import { OpenLayers } from './ol'
import { MapLibre } from './map-libre'
import { Leaflet } from './leaflet'

export const url_capa = 'http://localhost:3000/catastro_cdmx'

const extent = [-99.3564282805277514,19.0486218337350977,-98.9393818152620241,19.5926289308868782]
export function getCenter() {
  return [
    extent[2]-((extent[2]-extent[0])/2),
    extent[1]+((extent[3]-extent[1])/2),
  ]
}
// export const center = [-99.14790504789488, 19.320625382310986]
// export const center = getCenter()
export const zoom = 11.2

export class Mapas {
  constructor() {
    this.isSyncing = false
    this.leaflet = {}
    this.mapLibre = {}
    // this.olView = initMap(center, zoom)
  }

  changeFromLeaflet() {}

  changeFromMapLibre() {}

  changeFromOl() {}
}

// new Mapas()

let isSyncing = false
let timeSyncing = 1

const mapLibre = new MapLibre(getCenter(), zoom, url_capa, ({ center, zoom }) => {
  if (isSyncing) return
  isSyncing = true

  // console.log('moviendo', center, zoom);
  openLayers.setCenter(center)
  openLayers.setZoom(zoom+1)

  leaflet.setCenter(center)
  leaflet.setZoom(zoom+1)

  setTimeout(() => (isSyncing = false), timeSyncing)
})

const openLayers = new OpenLayers(getCenter(), zoom, url_capa, ({ center, zoom }) => {
  if (isSyncing) return
  isSyncing = true

  // console.log('moviendo', center, zoom);
  mapLibre.setCenter(center)
  mapLibre.setZoom(zoom-1)

  leaflet.setCenter(center)
  leaflet.setZoom(zoom)

  setTimeout(() => (isSyncing = false), timeSyncing)
})

const leaflet = new Leaflet(getCenter(), zoom, url_capa, ({ center, zoom }) => {
  if (isSyncing) return
  isSyncing = true

  // console.log('moviendo', center, zoom);
  openLayers.setCenter(center)
  openLayers.setZoom(zoom)

  mapLibre.setCenter(center)
  mapLibre.setZoom(zoom-1)

  setTimeout(() => (isSyncing = false), timeSyncing)
})
