import { saveModalOpen } from '../../../core/redux/module/modalOpenSlice'

/**
 * 이전에 찍었던 마커에 click 이벤트를 부여합니다
 * 마커를 클릭 시 기존 마커가 삭제되며, bottomSheet Modal이 close 됩니다
 * @param marker : 카카오맵 마커 객체
 */
export const deleteMarker = (marker: any, dispatch: any) => {
  window.kakao.maps.event.addListener(marker, 'click', function () {
    marker.setMap(null)

    dispatch(saveModalOpen({ modalOpen: false }))
  })
}
