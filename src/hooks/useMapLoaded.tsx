import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveLatLon } from '../core/redux/module/centerLatLonSlice'
import { saveMapObject } from '../core/redux/module/kakaoMapSlice'
import { saveMarker } from '../core/redux/module/markerSlice'
import { saveModalOpen } from '../core/redux/module/modalOpenSlice'

/**
 * Custom Hook for map component
 */
export const useMapLoaded = () => {
  const dispatch = useDispatch()

  // 스크립트가 Load 되었는지를 판단하는 state
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  /**
   * 스크립트가 완전히 생성됐다면 카카오맵과
   * 각종 기능들을 추가합니다
   */
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const { map, marker } = initObjectsForMap()

      // 센터 이동 버튼에 사용하기 위한 map 객체
      dispatch(saveMapObject(map))

      getCenterLocation(map)

      getMarker(map, marker)
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
      level: 5,
    }
    const map = new window.kakao.maps.Map(container, options)

    const marker = new window.kakao.maps.Marker({
      position: map.getCenter(),
    })

    return { map, marker }
  }

  /**
   * 나의 위치정보 권한을 얻어내어 지도를 내 위치로 이동시킵니다
   * 만약 권한 거부 시, 서울 시청을 기준으로 갱신됩니다
   * @param map 카카오맵 객체
   */
  const getCenterLocation = (map: any) => {
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

  /**
   *
   * @param map : 카카오맵 객체
   * @param marker : 카카오맵 마커 객체
   */
  const getMarker = (map: any, marker: any) => {
    window.kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: any) {
        const latLng = mouseEvent.latLng
        marker.setMap(map)
        marker.setPosition(latLng)

        /**
         * saveMarker 마커 객체를 저장
         * saveModalOpen 마커 클릭시 bottomSheet 모달 true로 변경
         */
        dispatch(saveMarker({ marker: marker }))
        dispatch(saveModalOpen({ modalOpen: true }))

        deleteMarker(marker)
      },
    )
  }

  /**
   * 이전에 찍었던 마커에 click 이벤트를 부여합니다
   * 마커를 클릭 시 기존 마커가 삭제되며, bottomSheet Modal이 close 됩니다
   * @param marker : 카카오맵 마커 객체
   */
  const deleteMarker = (marker: any) => {
    window.kakao.maps.event.addListener(marker, 'click', function () {
      marker.setMap(null)

      dispatch(saveModalOpen({ modalOpen: false }))
    })
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
