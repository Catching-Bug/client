import axios from 'axios'
import { postRefreshToken } from '../user'

const SERVER_API_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT

/**
 * 인증이 필요한 요청에 authorization을 Header에 담아 반환하는 Module
 * @returns axios instance를 반환
 */
const authInstance = () => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('uat')

    const instance = axios.create({
      baseURL: `${SERVER_API_ENDPOINT}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    return instance
  }

  return axios.create()
}

export const authAxios = authInstance()

authAxios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(error)
    const originalRequest = error.config

    console.log('&& originReq => ', originalRequest)

    if (!originalRequest._retry) {
      console.log('rety 통과')
      originalRequest._retry = true
      const tokens = await postRefreshToken()
      console.log('token 받아옴=>', tokens)

      localStorage.setItem('uat', tokens.accessToken)
      localStorage.setItem('urt', tokens.refreshToken)

      authAxios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokens.accessToken}`
      return authAxios(originalRequest)
    }
    return Promise.reject(error)
  },
)
