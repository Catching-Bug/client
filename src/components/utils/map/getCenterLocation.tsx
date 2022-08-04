import { saveLatLon } from '../../../core/redux/module/centerLatLonSlice'

export const getCenterLocation = (map: any) => {
  // 사용자의 위치를 정상적으로 받아오면 해당 위치가 중심좌표
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude,
        lon = position.coords.longitude

      const locPosition = new window.kakao.maps.LatLng(lat, lon)

      saveLatLon({
        Latitude: lat,
        Longitude: lon,
      })
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
