import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveMapObject } from '../redux/module/kakaoMap'
import { RootState } from '../redux/module/rootReducer'

export const useMapLoaded = (latitude: number, longitude: number) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const map = useSelector((state: RootState) => state.kakaoMap)
  const dispatch = useDispatch()

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
      }
      dispatch(saveMapObject(new window.kakao.maps.Map(container, options)))
      // const map =
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      })
      marker.setMap(map)
    })
  }

  useEffect(() => {
    const $script = document.createElement('script')
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false`
    $script.addEventListener('load', () => setMapLoaded(true))
    document.head.appendChild($script)
  }, [])

  return { mapLoaded, setMapLoaded, onLoadKakaoMap }
}
