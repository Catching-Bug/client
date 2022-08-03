import { useEffect } from 'react'
import { useMapLoaded } from '../../../hooks/useMapLoaded'
import CenterMoveButton from '../centerMoveButton/centerMoveButton'

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
        <CenterMoveButton></CenterMoveButton>
      </div>

      <style jsx>{`
        .MapContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default Map
