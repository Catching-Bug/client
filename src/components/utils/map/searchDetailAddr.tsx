import { Dispatch } from 'react'
import { saveLocation } from '../../../core/redux/module/locationSlice'

interface addressPropsType {
  mouseEventLatLng: any
  geocoder: any
  dispatch: Dispatch<any>
}

export const searchDetailAddr = ({
  mouseEventLatLng,
  geocoder,
  dispatch,
}: addressPropsType) => {
  searchDetailAddrFromCoords(
    mouseEventLatLng,
    geocoder,
    (result: any, status: any) => {
      handleDetailLocation(result, status, dispatch, mouseEventLatLng)
    },
  )
}

export const handleDetailLocation = (
  result: any,
  status: any,
  dispatch: Dispatch<any>,
  mouseEventLatLng: any,
) => {
  if (status === window.kakao.maps.services.Status.OK) {
    const detailLocation = result[0].address.address_name

    dispatch(
      saveLocation({
        location: detailLocation,
        latitude: mouseEventLatLng.Ma,
        longitude: mouseEventLatLng.La,
      }),
    )

    return detailLocation
  }
}

export const searchDetailAddrFromCoords = (
  coords: any,
  geocoder: any,
  callback: any,
) => {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
}
