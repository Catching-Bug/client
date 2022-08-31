import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mapAction } from '../components/utils/interface/mapActions'
import { addCenterChangedEvent } from '../components/utils/map/addCenterChangedEvent'
import { displayMarker } from '../components/utils/map/displayMarker'
import { getCenterLocation } from '../components/utils/map/getCenterLocation'
import { getMarker } from '../components/utils/map/getMarker'
import { handleCustomOverlay } from '../components/utils/map/handleCustomOverlay'
import { changeOverlayDeleteDetection } from '../core/redux/module/customOverlaySlice'
import { RootState } from '../core/redux/module/rootReducer'

export const useMapAction = ({
  showMyLocation,
  enableToGetMarker,
  displayUserLocationMarker,
  address,
  getAroundUserBoard,
}: mapAction) => {
  const dispatch = useDispatch()

  const { map, marker, geocoder } = useSelector(
    (state: RootState) => state.kakaoMapSlice,
  )

  /**
   * dispatch된 맵 오브젝트가 모두 값이 저장된 이후
   * 각종 옵션에 맞게 처리됩니다
   */
  useEffect(() => {
    if (map && marker && geocoder) {
      if (showMyLocation) getCenterLocation(map, dispatch)

      if (enableToGetMarker)
        getMarker({ map, marker, geocoder, dispatch, address })

      if (displayUserLocationMarker) {
        const { latitude, longitude } = displayUserLocationMarker

        displayMarker({ map, latitude, longitude })
      }

      if (getAroundUserBoard) {
        addCenterChangedEvent(map, geocoder, dispatch)
      }
    }
  }, [map, marker, geocoder])

  /**
   * customOverlay 관련 기능입니다
   * 보여져야 할 zoomLevel이 바뀌면 기존의 커스텀 오버레이를 지우고
   * 새로운 데이터를 받아 커스텀 오버레이를 그립니다
   */
  const { customOverlay, overlayDeleteDetection, centerLocation } = useSelector(
    (state: RootState) => state.customOverlaySlice,
  )

  useEffect(() => {
    if (customOverlay.length && getAroundUserBoard) {
      customOverlay.forEach((marker: any) => {
        marker.setMap(map)
      })
    }
  }, [customOverlay])

  useEffect(() => {
    if (overlayDeleteDetection && getAroundUserBoard) {
      customOverlay.forEach((marker: any) => {
        marker.setMap(null)
      })

      dispatch(changeOverlayDeleteDetection({ overlayDeleteDetection: false }))
    }
  }, [overlayDeleteDetection])

  useEffect(() => {
    if (geocoder && getAroundUserBoard) {
      geocoder.coord2Address(
        centerLocation.latitude,
        centerLocation.longitude,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const detailLocation: string = result[0].address.address_name

            const zoomLevel = map.getLevel()

            handleCustomOverlay(zoomLevel, map, dispatch, detailLocation)
          }
        },
      )
    }
  }, [centerLocation])
}
