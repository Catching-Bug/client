import { useEffect } from 'react'
import { useMapLoaded } from '../../hooks/useMapLoaded'

declare global {
  interface Window {
    kakao: any
  }
}
const Map = () => {
  const { mapLoaded, onLoadKakaoMap } = useMapLoaded()

  useEffect(() => {
    if (!mapLoaded) return

    onLoadKakaoMap()
  }, [mapLoaded])

  return (
    <>
      <div className="MapContainer" id="map">
        kakaoMap
      </div>
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
