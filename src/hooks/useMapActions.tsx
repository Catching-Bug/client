import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mapAction } from '../components/utils/interface/mapActions'
import { getCenterLocation } from '../components/utils/map/getCenterLocation'
import { getMarker } from '../components/utils/map/getMarker'
import { handleCustomOverlay } from '../components/utils/map/handleCustomOverlay'
import { zoomEvent } from '../components/utils/map/zoomEvent'
import { changeOverlayDeleteDetection } from '../core/redux/module/customOverlaySlice'
import { saveMapObject } from '../core/redux/module/kakaoMapSlice'
import { RootState } from '../core/redux/module/rootReducer'

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
  const { map, marker, geocoder } = useSelector(
    (state: RootState) => state.kakaoMapSlice,
  )

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
        level: 13,
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

  /**
   * dispatch된 맵 오브젝트가 모두 값이 저장된 이후
   * 각종 옵션에 맞게 처리됩니다
   */
  useEffect(() => {
    if (map && marker && geocoder) {
      if (showMyLocation) getCenterLocation(map, dispatch)

      if (enableToGetMarker)
        getMarker({ map, marker, geocoder, dispatch, address })

      if (getAroundUserBoard) {
        zoomEvent(map, dispatch)
      }
    }
  }, [map, marker, geocoder])

  /**
   * customOverlay 관련 기능입니다
   * 보여져야 할 zoomLevel이 바뀌면 기존의 커스텀 오버레이를 지우고
   * 새로운 데이터를 받아 커스텀 오버레이를 그립니다
   */
  // const { customOverlay, overlayDeleteDetection, zoomLevel } = useSelector(
  //   (state: RootState) => state.customOverlaySlice,
  // )

  // useEffect(() => {
  //   if (customOverlay.length && getAroundUserBoard) {
  //     customOverlay.forEach((marker: any) => {
  //       marker.setMap(map)
  //     })
  //   }
  // }, [customOverlay])

  // useEffect(() => {
  //   if (overlayDeleteDetection && getAroundUserBoard) {
  //     customOverlay.forEach((marker: any) => {
  //       marker.setMap(null)
  //     })

  //     dispatch(changeOverlayDeleteDetection({ overlayDeleteDetection: false }))
  //   }
  // }, [overlayDeleteDetection])

  // useEffect(() => {
  //   if (map && zoomLevel && getAroundUserBoard) {
  //     console.log('zoom', zoomLevel)
  //     handleCustomOverlay(zoomLevel, map, dispatch)
  //   }
  // }, [map, zoomLevel])

  return { mapLoaded, onLoadKakaoMap }
}
