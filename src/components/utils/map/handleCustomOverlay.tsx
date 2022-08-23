import { Dispatch } from 'react'
import {
  getCitiesCount,
  getRegionCount,
  getTownsCount,
} from '../../../core/api/board'
import {
  changeOverlayDeleteDetection,
  saveCustomOverlays,
} from '../../../core/redux/module/customOverlaySlice'

interface boardContentType {
  regionName: string
  latitude: number
  longitude: number
  count: number
}

export const handleCustomOverlay = (
  zoomLevel: number,
  map: any,
  dispatch: Dispatch<any>,
  detailLocation: string,
) => {
  dispatch(changeOverlayDeleteDetection({ overlayDeleteDetection: true }))

  const [region, city, town, ...etc] = detailLocation.split(' ')

  if (zoomLevel >= 10) {
    drawCustomOverlays(getRegionCount(), dispatch, map)
  } else if (zoomLevel >= 5) {
    drawCustomOverlays(getCitiesCount(region), dispatch, map)
  } else {
    drawCustomOverlays(getTownsCount(city), dispatch, map)
  }
}

const drawCustomOverlays = async (
  fetch: Promise<any>,
  dispatch: Dispatch<any>,
  map: any,
) => {
  try {
    const result = await fetch

    const overlays: object[] = []

    result?.content?.forEach((location: boardContentType) => {
      const content = getContentDesign(location.count)

      const position = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      )

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
      })

      overlays.push(customOverlay)
    })

    overlays.forEach((marker: any) => {
      marker.setMap(map)
    })

    dispatch(saveCustomOverlays({ customOverlay: overlays }))
  } catch (error) {
    console.log('handleCustomOverlay 에러')
  }
}

const getContentDesign = (count: number) => {
  const getStyle = (width: number, height: number, color: string) => {
    return `
      <div 
        style="
          width: ${width}px; 
          height: ${height}px;
          background-color: rgb(${color}, 50%); 
          border-radius: 100%; 
          display: flex; 
          justify-content: center; 
          align-items: center;
        ">
        <div
          style="
          width: 30px; 
          height: 30px;
          background-color: rgb(${color}); 
          border-radius: 100%; 
          display: flex; 
          justify-content: center; 
          align-items: center;
          ">
        ${count}
        </div>
      </div>
    `
  }

  if (count >= 100) {
    return getStyle(50, 50, '255, 50, 0')
  } else if (count >= 10) {
    return getStyle(45, 45, '255, 100, 255')
  } else {
    return getStyle(40, 40, '0, 125, 255')
  }
}
