import { saveMarker } from '../../../core/redux/module/markerSlice'
import { saveModalOpen } from '../../../core/redux/module/modalOpenSlice'
import { deleteMarker } from './deleteMarker'

/**
 * 지도를 클릭 시 해당 위치에 마커를 생성합니다.
 * @param map : 카카오맵 객체
 * @param marker : 카카오맵 마커 객체
 */
export const getMarker = (map: any, marker: any, dispatch: any) => {
  window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
    const latLng = mouseEvent.latLng
    marker.setMap(map)
    marker.setPosition(latLng)

    /**
     * saveMarker 마커 객체를 저장
     * saveModalOpen 마커 클릭시 bottomSheet 모달 true로 변경
     */
    dispatch(saveMarker({ marker: marker }))
    dispatch(saveModalOpen({ modalOpen: true }))

    deleteMarker(marker, dispatch)
  })
}
