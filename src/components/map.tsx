import { useEffect } from 'react'
import { useMapLoaded } from '../hooks/useMapLoaded'

declare global {
  interface Window {
    kakao: any
  }
}

interface MapLocationProps {
  latitude: number
  longitude: number
}

const Map = ({ latitude, longitude }: MapLocationProps) => {
  const { mapLoaded, onLoadKakaoMap } = useMapLoaded(latitude, longitude)

  useEffect(() => {
    if (!mapLoaded) return

    onLoadKakaoMap()
  }, [mapLoaded])

  return (
    <>
      <div className="MapContainer" id="map" />
      <style jsx>{`
        .MapContainer {
          width: 100%;
          height: 360px;
        }
      `}</style>
    </>
  )
}

export default Map
