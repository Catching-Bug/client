import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { mapAction } from '../components/utils/interface/mapActions'
import { getCenterLocation } from '../components/utils/map/getCenterLocation'
import { getMarker } from '../components/utils/map/getMarker'
import { saveMapObject } from '../core/redux/module/kakaoMapSlice'

/**
 * 맵에 사용되는 각종 action 기능이 모여있습니다.
 */
export const useMapActions = ({
  showMyLocation,
  enableToGetMarker,
  address,
  getAroundUserBoard,
  markerOnClick,
}: mapAction) => {
  const dispatch = useDispatch()

  // 스크립트가 Load 되었는지를 판단하는 state
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  /**
   * 스크립트가 완전히 생성됐다면 카카오맵과
   * 각종 기능들을 추가합니다
   */
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const { map, marker, geocoder } = initObjectsForMap()

      // 센터 이동 버튼에 사용하기 위한 map 객체
      dispatch(saveMapObject(map))

      if (showMyLocation) getCenterLocation(map, dispatch)

      if (enableToGetMarker)
        getMarker({ map, marker, geocoder, dispatch, address })
    })
  }

  /**
   * kakaoMap을 그리기 위한 객체의 기본 세팅을 하고
   * 이를 반환하는 함수입니다
   * @returns default 세팅된 맵과 마커
   */
  const initObjectsForMap = () => {
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(
        37.56683096014424,
        126.97865225689458,
      ),
      level: 2,
    }
    const map = new window.kakao.maps.Map(container, options)

    const marker = new window.kakao.maps.Marker({
      position: map.getCenter(),
    })

    const geocoder = new window.kakao.maps.services.Geocoder()

    return { map, marker, geocoder }
  }

  /**
   * 최초 렌더링에 map을 그리기 전 script를 읽어옵니다.
   */
  useEffect(() => {
    const $script = document.createElement('script')
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`
    $script.addEventListener('load', () => setMapLoaded(true))
    document.head.appendChild($script)
  }, [])

  return { mapLoaded, onLoadKakaoMap }
}
