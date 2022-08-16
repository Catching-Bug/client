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
    function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const detailLocation = !!result[0].road_address
          ? result[0].road_address.address_name
          : null

        dispatch(
          saveLocation({
            location: detailLocation,
            latitude: mouseEventLatLng.Ma,
            longitude: mouseEventLatLng.La,
          }),
        )
      }
    },
  )
}

const searchDetailAddrFromCoords = (
  coords: any,
  geocoder: any,
  callback: any,
) => {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
}
