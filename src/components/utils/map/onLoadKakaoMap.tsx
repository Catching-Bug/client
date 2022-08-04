import { saveMapObject } from '../../../core/redux/module/kakaoMapSlice'
import { getCenterLocation } from './getCenterLocation'

export const onLoadKakaoMap = () => {
  window.kakao.maps.load(() => {
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(
        37.56683096014424,
        126.97865225689458,
      ),
      level: 5,
    }
    const map = new window.kakao.maps.Map(container, options)

    saveMapObject(map)

    getCenterLocation(map)
  })
}
