import { MutableRefObject, useEffect, useState } from 'react'
import { act } from 'react-dom/test-utils'
import { useSelector } from 'react-redux'
import { getAllLocations, postLocation } from '../core/api/location'
import { RootState } from '../core/redux/module/rootReducer'

interface locationTypes {
  id: number
  latitude: number
  longitude: number
  region: string
  city: string
  town: string
  detailLocation: string
}

/**
 * 내 위치에 대한 정보와 위치를 추가하는 커스텀 훅입니다
 * @param detailInputRef 상세 주소 input에 대한 Ref
 * @param toggleModalOpenStatus 모달창의 상태를 관리하는 toggle 기능
 * @returns
 */
export const useLocation = (
  detailInputRef: MutableRefObject<any>,
  toggleModalOpenStatus: () => void,
) => {
  const [myLocations, setMyLocations] = useState<locationTypes[]>([])

  const { location, latitude, longitude } = useSelector(
    (state: RootState) => state.locationSlice,
  )

  /**
   * 완료 버튼. 로케이션 정보를 저장합니다.
   */
  const handleSetlocation = async () => {
    try {
      if (!location) {
        alert('잘못된 주소를 선택하셨습니다.')
        return
      }

      const [region, city, town, ...etc] = location.split(' ')

      const detailLocation = `${etc.join(' ')} ${detailInputRef.current.value}`

      const result = await postLocation({
        latitude,
        longitude,
        region,
        city,
        town,
        detailLocation,
      })

      // 추가된 내 위치 저장
      setMyLocations([
        {
          id: result.id,
          latitude: latitude,
          longitude: longitude,
          region: region,
          city: city,
          town: town,
          detailLocation: detailLocation,
        },
        ...myLocations,
      ])

      toggleModalOpenStatus()
    } catch (error) {
      return
    }
  }

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const result = await getAllLocations()

        setMyLocations(result)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllLocations()
  }, [])

  return { myLocations, handleSetlocation }
}
