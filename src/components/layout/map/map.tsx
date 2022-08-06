import { useEffect } from 'react'
import { useMapLoaded } from '../../../hooks/useMapLoaded'
import CenterMoveButton from '../centerMoveButton/centerMoveButton'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../core/redux/module/rootReducer'
import ModalBottomSheet from '../modalBottomSheet/modalBottomSheet'
import { saveModalOpen } from '../../../core/redux/module/modalOpenSlice'

const Map = () => {
  const { mapLoaded, onLoadKakaoMap } = useMapLoaded()

  useEffect(() => {
    if (!mapLoaded) return

    onLoadKakaoMap()
  }, [mapLoaded])

  const dispatch = useDispatch()
  const { marker } = useSelector((state: RootState) => state.markerSlice)

  const closeBottomSheet = () => {
    dispatch(saveModalOpen({ modalOpen: false }))
    marker.setMap(null)
  }

  return (
    <>
      <div className="MapContainer" id="map">
        kakaoMap
        <CenterMoveButton />
        <ModalBottomSheet closeBottomSheet={closeBottomSheet} />
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
