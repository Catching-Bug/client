import { MutableRefObject, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllLocations, postLocation } from '../core/api/location'
import { RootState } from '../core/redux/module/rootReducer'

export const useLocation = (
  detailInputRef: MutableRefObject<any>,
  toggleModalOpenStatus: () => void,
) => {
  const [myLocations, setMyLocations] = useState<object[]>([])

  const { location, latitude, longitude } = useSelector(
    (state: RootState) => state.locationSlice,
  )

  /**
   *
   */
  const handleSetlocation = async () => {
    try {
      if (!detailInputRef.current.value) {
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
        ...myLocations,
        {
          id: result.id,
          latitude: latitude,
          longitude: longitude,
          region: region,
          city: city,
          town: town,
          detailLocation: detailLocation,
        },
      ])

      toggleModalOpenStatus()
    } catch (error) {
      console.log(error, '오류가 발생했습니다. 관리자에게 문의해주세요.')
    }
  }

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const result = await getAllLocations()

        setMyLocations(result)
      } catch (error) {
        console.log('에러가 발생했습니다. 관리자에게 문의해주세요.')
      }
    }

    fetchAllLocations()
  }, [])

  return { myLocations, handleSetlocation }
}
