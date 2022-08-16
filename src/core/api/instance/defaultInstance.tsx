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

export const defaultAxios = defaultInstance()
