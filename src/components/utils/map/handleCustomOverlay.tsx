import { Dispatch } from 'react'
import {
  getCitiesCount,
  getRegionCount,
  getTownsCount,
} from '../../../core/api/board'
import {
  changeOverlayDeleteDetection,
  saveCustomOverlays,
  saveZoomLevel,
} from '../../../core/redux/module/customOverlaySlice'

interface regionTypes {
  regionName: string
  latitude: number
  longitude: number
  count: number
}

export const handleCustomOverlay = (
  zoomLevel: number,
  map: any,
  dispatch: Dispatch<any>,
) => {
  dispatch(changeOverlayDeleteDetection({ overlayDeleteDetection: true }))

  if (zoomLevel >= 10) {
    drawCustomOverlays(getRegionCount, dispatch, map)
  } else if (zoomLevel >= 7) {
    drawCustomOverlays(getCitiesCount, dispatch, map)
  } else if (zoomLevel >= 4) {
    drawCustomOverlays(getTownsCount, dispatch, map)
  } else {
  }
}

const drawCustomOverlays = async (
  fetch: () => Promise<any>,
  dispatch: Dispatch<any>,
  map: any,
) => {
  // try {
  const result = await fetch()

  const overlays: object[] = []

  result?.content?.forEach((location: regionTypes) => {
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

  console.log(overlays)

  overlays.forEach((marker: any) => {
    marker.setMap(map)
  })

  dispatch(saveCustomOverlays({ customOverlay: overlays }))
  // } catch (error) {
  //   console.log(error, '문제 생김')
  // }
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
