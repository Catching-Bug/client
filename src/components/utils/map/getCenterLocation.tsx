import { saveLatLon } from '../../../core/redux/module/centerLatLonSlice'

/**
 * 나의 위치정보 권한을 얻어내어 지도를 내 위치로 이동시킵니다
 * 만약 권한 거부 시, 서울 시청을 기준으로 갱신됩니다
 * @param map 카카오맵 객체
 */
export const getCenterLocation = (map: any, dispatch: any) => {
  // 사용자의 위치를 정상적으로 받아오면 해당 위치가 중심좌표
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude,
        lon = position.coords.longitude

      const locPosition = new window.kakao.maps.LatLng(lat, lon)

      // 내 위치 이동 버튼에 사용하기 위한 lat, lon 저장
      dispatch(
        saveLatLon({
          latitude: lat,
          longitude: lon,
        }),
      )

      // 내 위치로 변경
      map.setCenter(locPosition)
    })
  }
  // 아니라면 서울 시청이 기본 중심좌표
  else {
    const locPosition = new window.kakao.maps.LatLng(
      37.56683096014424,
      126.97865225689458,
    )
    map.setCenter(locPosition)
  }
}
