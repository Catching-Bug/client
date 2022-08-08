import axios from 'axios'

const SERVER_API_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT

/**
 * 인증이 필요없는 기본 요청 Module
 * @returns axios instance를 반환
 */
const defaultInstance = () => {
  const instance = axios.create({
    baseURL: `${SERVER_API_ENDPOINT}`,
  })

  return instance
}

/**
 * 인증이 필요한 요청에 authorization을 Header에 담아 반환하는 Module
 * @returns axios instance를 반환
 */
export const authInstance = () => {
  const accessToken = localStorage.getItem('uat')

  const instance = axios.create({
    baseURL: `${SERVER_API_ENDPOINT}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return instance
}

export const defaultAxios = defaultInstance()
export const authAxios = authInstance()
