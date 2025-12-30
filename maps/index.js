import { MapLibre, name as nameMaplibre } from './map-libre'
import { OpenLayers, name as nameOl } from './ol'
import { Leaflet, name as nameLeaflet } from './leaflet'

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

const mapLibre = new MapLibre(getCenter(), zoom, url_capa, changeViews)
const openLayers = new OpenLayers(getCenter(), zoom, url_capa, changeViews)
// const leaflet = new Leaflet(getCenter(), zoom, url_capa, changeViews)

let isSyncing = false
let timeSyncing = 1
function changeViews({ center, zoom, from }) {
  if (isSyncing) return
  isSyncing = true

  if (from !== nameMaplibre) {
    mapLibre.setCenter(center)
    mapLibre.setZoom(zoom - 1)
  }

  if (from !== nameOl) {
    openLayers.setCenter(center)
    openLayers.setZoom(zoom)
  }

  // if (from !== nameLeaflet) {
  //   leaflet.setCenter(center)
  //   leaflet.setZoom(zoom)
  // }

  setTimeout(() => (isSyncing = false), timeSyncing)
}
