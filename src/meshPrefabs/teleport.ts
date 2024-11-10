import { $, ArxMap, Settings, Vector3 } from 'arx-level-generator'
import { Box3 } from 'three'

export async function createTeleport(settings: Settings) {
  const city = await ArxMap.fromOriginalLevel(11, settings)

  const selection = $(city.polygons)
    .selectWithinBox(new Box3(new Vector3(10060, 1000, 6400), new Vector3(10851, 1650, 7300)))
    .copy()
    .selectAll()
    .moveToRoom1()
    .move(new Vector3(-10000, -1700, -7000))

  selection.clearSelection().selectByTextures(['[stone]_human_stone_ornament']).delete()

  const polygons = selection
    .selectAll()
    .apply((polygon, idx) => {
      if (idx === 695) {
        polygon.vertices[0].z += 25
        polygon.vertices[0].uv.y = 0
      }

      if (idx === 44) {
        polygon.vertices[1].z -= 50
        polygon.vertices[1].uv.y = 1
      }

      return polygon
    })
    .get()

  const topLeftPolygon = polygons[695].clone()
  topLeftPolygon.move(new Vector3(0, 0, 100))

  const bottomLeftPolygon = polygons[44].clone()
  bottomLeftPolygon.move(new Vector3(0, 0, -100))

  polygons.push(topLeftPolygon, bottomLeftPolygon)

  return polygons
}
