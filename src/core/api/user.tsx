/**
 * Rest API module for user
 *
 * 위에서부터 GET, POST, PUT, DELETE 순으로 정리되어 있습니다.
 */

import { authAxios } from './instance/authInstance'
import { defaultAxios } from './instance/defaultInstance'

interface authType {
  [key: string]: string | null
}

/**
 * GET : kakao 인가 코드를 통해 로그인을 시도합니다.
 * @returns data 로그인 요청한 데이터 JWT와 Email, Gender 반환
 */
export const getAuthLogin = async (authCode: authType) => {
  try {
    const { data } = await defaultAxios.get('/api/login/oauth', {
      params: authCode,
    })

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * POST : 리프레시 토큰을 재요청
 * @returns data refresh token 반환
 */
export const postRefreshToken = async () => {
  try {
    if (typeof window !== undefined) {
      const { data } = await defaultAxios.post('/api/token/refresh', {
        params: {
          refreshToken: localStorage.getItem('urt'),
        },
      })

      return data
    }
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
