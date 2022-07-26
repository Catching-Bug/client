import { saveMarker } from '../../../core/redux/module/markerSlice'
import { searchDetailAddr } from './searchDetailAddr'
import { Dispatch } from 'react'

/**
 * 지도를 클릭 시 해당 위치에 마커를 생성합니다.
 * @param map: 카카오맵 객체
 * @param marker : 카카오맵 마커 객체
 * @param dispatch : dispatch
 * @param geocoder : 카카오맵 좌표 -> 주소 변경 객체
 * @param address : 주소가 필요한지에 대한 true false
 */
export const getMarker = ({
  map,
  marker,
  dispatch,
  geocoder,
  address,
}: markerPropsType) => {
  window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
    setClickAction({ mouseEvent, map, marker, dispatch, geocoder, address })
  })
}

export const setClickAction = ({
  mouseEvent,
  map,
  marker,
  dispatch,
  geocoder,
  address,
}: clickActionTypes) => {
  const latLng = mouseEvent.latLng
  marker.setMap(map)
  marker.setPosition(latLng)

  dispatch(saveMarker({ marker: marker }))

  if (address) {
    searchDetailAddr({ mouseEventLatLng: latLng, geocoder, dispatch })
  }
}

interface markerPropsType {
  map: any
  marker: any
  dispatch: Dispatch<any>
  geocoder: any
  address?: boolean
}

interface clickActionTypes extends markerPropsType {
  mouseEvent: any
}
