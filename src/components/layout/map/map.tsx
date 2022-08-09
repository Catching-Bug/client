import { useEffect } from 'react'
import { useMapLoaded } from '../../../hooks/useMapLoaded'
import CenterMoveButton from '../centerMoveButton/centerMoveButton'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../core/redux/module/rootReducer'
import ModalBottomSheet from '../modalBottomSheet/modalBottomSheet'
import { saveModalOpen } from '../../../core/redux/module/modalOpenSlice'

const Map = () => {
  const { mapLoaded, onLoadKakaoMap } = useMapLoaded()

  /**
   * map script가 Load되었을 시 map을 그립니다.
   */
  useEffect(() => {
    if (!mapLoaded) return

    onLoadKakaoMap()
  }, [mapLoaded])

  const dispatch = useDispatch()
  const { marker } = useSelector((state: RootState) => state.markerSlice)

  /**
   * 해당 function은 bottomSheet에 사용됩니다.
   * unit test를 위해 props를 넘기게 됩니다.
   * bottomSheet를 끄고 찍혔던 마커를 지웁니다.
   */
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
