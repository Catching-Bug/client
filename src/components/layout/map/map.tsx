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

  const { modalOpen } = useSelector((state: RootState) => state.modalOpenSlice)
  const dispatch = useDispatch()

  const closeBottomSheet = () => {
    dispatch(saveModalOpen({ modalOpen: false }))
  }

  return (
    <>
      <div className="MapContainer" id="map">
        kakaoMap
        <CenterMoveButton />
        {modalOpen && <ModalBottomSheet closeBottomSheet={closeBottomSheet} />}
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
