import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveLatLon } from '../core/redux/module/centerLatLonSlice'
import { saveMapObject } from '../core/redux/module/kakaoMapSlice'
import { saveMarker } from '../core/redux/module/markerSlice'
import { saveModalOpen } from '../core/redux/module/modalOpenSlice'

export const useMapLoaded = () => {
  const dispatch = useDispatch()
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const { map, marker } = initObjectsForMap()

      // 센터 이동 버튼에 사용하기 위한 map 객체
      dispatch(saveMapObject(map))

      getCenterLocation(map)

      getMarker(map, marker)
    })
  }

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

  const getCenterLocation = (map: any) => {
    // 사용자의 위치를 정상적으로 받아오면 해당 위치가 중심좌표
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude,
          lon = position.coords.longitude

        const locPosition = new window.kakao.maps.LatLng(lat, lon)

        // 센터 이동 버튼에 사용하기 위한 lat, lon
        dispatch(
          saveLatLon({
            latitude: lat,
            longitude: lon,
          }),
        )
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

  const getMarker = (map: any, marker: any) => {
    window.kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: any) {
        const latLng = mouseEvent.latLng
        marker.setMap(map)
        marker.setPosition(latLng)

        dispatch(saveMarker({ marker: marker }))

        dispatch(saveModalOpen({ modalOpen: true }))

        deleteMarker(marker)
      },
    )
  }

  const deleteMarker = (marker: any) => {
    window.kakao.maps.event.addListener(marker, 'click', function () {
      marker.setMap(null)

      dispatch(saveModalOpen({ modalOpen: false }))
    })
  }

  useEffect(() => {
    const $script = document.createElement('script')
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`
    $script.addEventListener('load', () => setMapLoaded(true))
    document.head.appendChild($script)
  }, [])

  return { mapLoaded, onLoadKakaoMap }
}
