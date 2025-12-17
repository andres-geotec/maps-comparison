const extent = [-99.3564282805277514,19.0486218337350977,-98.9393818152620241,19.5926289308868782]

export const zoom = 12;

export function getCenter() {
  return [
    extent[2]-((extent[2]-extent[0])/2),
    extent[1]+((extent[3]-extent[1])/2)
  ]
}
