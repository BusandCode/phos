export interface Coordinates {
  latitude: number
  longitude: number
}

export interface MapMarker {
  id: string
  coordinates: Coordinates
  category: string
  status: string
  title: string
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}