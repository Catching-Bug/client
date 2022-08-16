import { locationTypes } from '../../components/utils/interface/locationTypes'
import { authAxios } from './instance/authInstance'

export const getAllLocations = async () => {
  try {
    const { data } = await authAxios.get('/api/locations')

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * 내 위치에 대한 정보
 * @param latitude 위도
 * @param longitude 경도
 * @param region 시 단위
 * @param city 구 단위
 * @param town 동 단위 그 이하
 * @param detailLocation 상세주소
 * @returns 성공 시 생성된 내 위치 id값 리턴
 */
export const postLocation = async ({
  latitude,
  longitude,
  region,
  city,
  town,
  detailLocation,
}: locationTypes) => {
  try {
    const { data } = await authAxios.post('/api/locations', {
      params: {
        latitude: latitude,
        longitude: longitude,
        region: region,
        city: city,
        town: town,
        detailLocation: detailLocation,
      },
    })

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
