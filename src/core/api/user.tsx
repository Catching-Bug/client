import { defaultAxios, authAxios } from './instanceAxios'

/**
 * Rest API module for user
 *
 * 위에서부터 GET, POST, PUT, DELETE 순으로 정리되어 있습니다.
 */

/**
 *
 * @returns data 로그인 요청한 데이터 값
 */
export const getAuthLogin = async () => {
  try {
    const { data } = await defaultAxios.get('/api/login/oauth')

    return data
  } catch (error) {
    alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
