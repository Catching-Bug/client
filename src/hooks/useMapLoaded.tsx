import Kakao from 'next-auth/providers/kakao'
import { useEffect, useState } from 'react'

export const useMapLoaded = (latitude: number, longitude: number) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 5,
      }
      const map = new window.kakao.maps.Map(container, options)

      getCenterLocation(map)
    })
  }

  const getCenterLocation = (map: any) => {
    // 사용자의 위치를 정상적으로 받아오면 해당 위치가 중심좌표
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude,
          lon = position.coords.longitude

        const locPosition = new window.kakao.maps.LatLng(lat, lon)
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

  useEffect(() => {
    const $script = document.createElement('script')
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false`
    $script.addEventListener('load', () => setMapLoaded(true))
    document.head.appendChild($script)
  }, [])

  return { mapLoaded, setMapLoaded, onLoadKakaoMap }
}
