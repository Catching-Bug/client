import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveMapObject } from '../core/redux/module/kakaoMapSlice'

/**
 * 맵에 사용되는 각종 action 기능이 모여있습니다.
 */
export const useMapLoaded = () => {
  const dispatch = useDispatch()

  // 스크립트가 Load 되었는지를 판단하는 state
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  /**
   * 최초 렌더링에 map을 그리기 전 script를 읽어옵니다.
   */
  useEffect(() => {
    const $script = document.createElement('script')
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`
    $script.addEventListener('load', () => setMapLoaded(true))
    document.head.appendChild($script)
  }, [])

  /**
   * 스크립트가 완전히 생성됐다면 카카오맵과
   * 각종 기능들을 추가합니다
   */
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(
          37.56683096014424,
          126.97865225689458,
        ),
        level: 4,
      }

      const mapObj = new window.kakao.maps.Map(container, options)

      const markerObj = new window.kakao.maps.Marker({
        position: mapObj.getCenter(),
      })

      const geocoderObj = new window.kakao.maps.services.Geocoder()

      dispatch(
        saveMapObject({
          map: mapObj,
          marker: markerObj,
          geocoder: geocoderObj,
        }),
      )
    })
  }

  return { mapLoaded, onLoadKakaoMap }
}
