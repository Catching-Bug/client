interface displayMarkerTypes {
  map: any
  latitude: number
  longitude: number
}

export const displayMarker = ({
  map,
  latitude,
  longitude,
}: displayMarkerTypes) => {
  const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)

  const marker = new window.kakao.maps.Marker({
    position: markerPosition,
  })

  map.setCenter(markerPosition)

  marker.setMap(map)
}
