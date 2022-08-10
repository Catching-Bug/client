import { useSelector } from 'react-redux'
import { RootState } from '../core/redux/module/rootReducer'

/**
 * Custom Hook for CenterButton component
 */
export const useCenterBtn = () => {
  const { map } = useSelector((state: RootState) => state.kakaoMapSlice)
  const { latitude, longitude } = useSelector(
    (state: RootState) => state.centerLatLonSlice,
  )

  /**
   * 내 위치 이동 버튼
   * kakaomap에 사용되는 LatLng 객체 저장
   * panTo는 자연스럽게 화면을 이동시킵니다.
   */
  const handleMoveToCenter = () => {
    if (!map) return

    const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude)

    map.panTo(moveLatLon)
  }

  return { handleMoveToCenter }
}
