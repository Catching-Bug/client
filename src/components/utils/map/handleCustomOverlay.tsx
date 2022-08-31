import Router from 'next/router'
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
  regionName?: string
  cityName?: string
  townName?: string
  latitude: number
  longitude: number
  count: number
}

interface boardFetchDatas {
  message: string
  content: boardContentType[]
}

export const handleCustomOverlay = (
  zoomLevel: number,
  map: any,
  dispatch: Dispatch<any>,
  detailLocation: string,
) => {
  dispatch(changeOverlayDeleteDetection({ overlayDeleteDetection: true }))

  const [region, city, t, ...e] = detailLocation.split(' ')

  if (zoomLevel >= 10) {
    drawCustomOverlays(getRegionCount(), dispatch, map)
  } else if (zoomLevel >= 7) {
    drawCustomOverlays(getCitiesCount(region), dispatch, map)
  } else {
    drawCustomOverlays(getTownsCount(city), dispatch, map, true)
  }
}

const drawCustomOverlays = async (
  fetch: Promise<any>,
  dispatch: Dispatch<any>,
  map: any,
  isTown?: boolean,
) => {
  try {
    const result: boardFetchDatas = await fetch

    handleFetchData(result, dispatch, map, isTown)
  } catch (error) {
    console.log('handleCustomOverlay 에러')
  }
}

const handleFetchData = (
  result: boardFetchDatas,
  dispatch: Dispatch<any>,
  map: any,
  isTown?: boolean,
) => {
  const { overlays, latlon } = parseResultBoardInfo(result)

  addEventToOverlay(overlays, latlon, map, isTown)

  dispatch(saveCustomOverlays({ customOverlay: overlays }))
}

const parseResultBoardInfo = (result: boardFetchDatas) => {
  const overlays: object[] = []
  const latlon: object[] = []

  result?.content?.forEach((location: boardContentType, index) => {
    let content: string = ''
    if (location.townName)
      content = getContentDesign(location.count, index, location.townName)
    else content = getContentDesign(location.count, index)

    const position = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude,
    )

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
    })

    overlays.push(customOverlay)
    latlon.push(position)
  })

  return { overlays, latlon }
}

const addEventToOverlay = (
  overlays: object[],
  latlon: object[],
  map: any,
  isTown?: boolean,
) => {
  overlays.forEach((marker: any, index: number) => {
    marker.setMap(map)

    const markerElement = document.getElementById(`marker${index}`)

    if (markerElement) {
      markerElement.addEventListener('click', (event) => {
        if (isTown) {
          const townName = (event.target as Element).className

          Router.push(`/board/list/${townName}`)
        } else {
          const level = map.getLevel()

          if (level >= 10) map.setLevel(8, { anchor: latlon[index] })
          else if (level >= 7) map.setLevel(5, { anchor: latlon[index] })
        }
      })
    }
  })
}

const getContentDesign = (count: number, index: number, townName?: string) => {
  const getStyle = (width: number, height: number, color: string) => {
    return `
      <div 
        id="marker${index}"
        class="${townName}"
        style="
          width: ${width}px; 
          height: ${height}px;
          background-color: rgb(${color}, 50%); 
          border-radius: 100%; 
          display: flex; 
          justify-content: center; 
          align-items: center;
          cursor: pointer;
        ">
        <div
          class="${townName}"
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
