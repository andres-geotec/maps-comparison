import { MapLibre } from './map-libre'
import { OpenLayers } from './ol'

export const capa_mvt = 'catastro_cdmx'
export const capa_wms = 'catastro_cdmx'

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

const mapLibreMvt = new MapLibre('mvt', getCenter(), zoom, capa_mvt, changeViews)
const openLayersMvt = new OpenLayers('mvt', getCenter(), zoom, capa_mvt, changeViews)
const mapLibreWms = new MapLibre('wms', getCenter(), zoom, capa_wms, changeViews)
const openLayersWms = new OpenLayers('wms', getCenter(), zoom, capa_wms, changeViews)

let isSyncing = false
let timeSyncing = 1
function changeViews({ center, zoom, from }) {
  if (isSyncing) return
  isSyncing = true

  if (from !== mapLibreMvt.id) {
    mapLibreMvt.setCenter(center)
    mapLibreMvt.setZoom(zoom - 1)
  }

  if (from !== openLayersMvt.id) {
    openLayersMvt.setCenter(center)
    openLayersMvt.setZoom(zoom)
  }

  if (from !== mapLibreWms.id) {
    mapLibreWms.setCenter(center)
    mapLibreWms.setZoom(zoom - 1)
  }

  if (from !== openLayersWms.id) {
    openLayersWms.setCenter(center)
    openLayersWms.setZoom(zoom)
  }

  setTimeout(() => (isSyncing = false), timeSyncing)
}
