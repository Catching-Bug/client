import { authAxios } from './instance/authInstance'

export const getAllLocations = async () => {
  try {
    const { data } = await authAxios.get('/api/locations')

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
