import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { saveLatLon } from '../../../core/redux/module/centerLatLon'
import { saveMapObject } from '../../../core/redux/module/kakaoMap'
import CenterMoveButton from '../centerMoveButton/centerMoveButton'

declare global {
  interface Window {
    kakao: any
  }
}

let kakaoMap

const Map = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!kakaoMapRef) return

    window.kakao.maps.load(() => {
      const option = {
        center: new window.kakao.maps.LatLng(
          37.56683096014424,
          126.97865225689458,
        ),
        level: 5,
      }

      kakaoMap = new window.kakao.maps.Map(kakaoMapRef.current, option)

      dispatch(saveMapObject(kakaoMap))

      getCenterLocation(kakaoMap)
    })
  }, [kakaoMapRef])

  const getCenterLocation = (map: any) => {
    // 사용자의 위치를 정상적으로 받아오면 해당 위치가 중심좌표
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude,
          lon = position.coords.longitude

        const locPosition = new window.kakao.maps.LatLng(lat, lon)

        map.setCenter(locPosition)

        dispatch(saveLatLon({ Latitude: lat, Longitude: lon }))
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

  return (
    <>
      <div className="MapContainer" ref={kakaoMapRef}>
        kakaoMap
        <CenterMoveButton></CenterMoveButton>
      </div>

      <style jsx>{`
        .MapContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default Map
