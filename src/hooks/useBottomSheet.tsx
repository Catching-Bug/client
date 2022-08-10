import { useDispatch, useSelector } from 'react-redux'
import { saveModalOpen } from '../core/redux/module/modalOpenSlice'
import { RootState } from '../core/redux/module/rootReducer'

/**
 * Custom Hook for BottomSheet component
 */
export const useBottomSheet = () => {
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

  return { closeBottomSheet }
}
