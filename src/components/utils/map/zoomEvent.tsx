import { Dispatch } from 'react'
import { saveZoomLevel } from '../../../core/redux/module/customOverlaySlice'

export const zoomEvent = (map: any, dispatch: Dispatch<any>) => {
  window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
    const zoomLevel = map.getLevel()

    dispatch(saveZoomLevel(zoomLevel))
  })
}
