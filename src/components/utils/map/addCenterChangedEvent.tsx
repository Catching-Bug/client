import { Dispatch } from 'react'
import { changeCenterLocation } from '../../../core/redux/module/customOverlaySlice'

export const addCenterChangedEvent = (
  map: any,
  geocoder: any,
  dispatch: Dispatch<any>,
) => {
  let timer: NodeJS.Timeout

  window.kakao.maps.event.addListener(map, 'center_changed', () => {
    if (geocoder) {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        const mapCenterLatLng = map.getCenter()
        const [lat, lon] = [mapCenterLatLng.getLng(), mapCenterLatLng.getLat()]

        dispatch(
          changeCenterLocation({
            centerLocation: { latitude: lat, longitude: lon },
          }),
        )
      }, 200)
    }
  })
}
