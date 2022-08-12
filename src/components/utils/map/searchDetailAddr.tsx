interface addressPropsType {
  mouseEventLatLng: any
  geocoder: any
}

export const searchDetailAddr = ({
  mouseEventLatLng,
  geocoder,
}: addressPropsType) => {
  searchDetailAddrFromCoords(
    mouseEventLatLng,
    geocoder,
    function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const detailAddr = !!result[0].road_address
          ? result[0].road_address.address_name
          : null

        console.log(detailAddr)
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
