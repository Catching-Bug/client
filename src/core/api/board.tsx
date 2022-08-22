import { authAxios } from './instance/authInstance'

interface boardCreateTypes {
  title: string
  content: string
  latitude: number
  longitude: number
}

/**
 * GET : 도시 단위의 위 경도 및 글 수를 조회합니다
 * @returns data 검색된 도시 단위의 데이터
 */
export const getRegionCount = async () => {
  try {
    const { data } = await authAxios.get('/api/regions/count')

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * GET : 구 단위의 위 경도 및 글 수를 조회합니다
 * @returns data 검색된 구 단위의 데이터
 */
export const getCitiesCount = async () => {
  try {
    const { data } = await authAxios.get('/api/cities/count')

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * GET : 동 단위의 위 경도 및 글 수를 조회합니다
 * @returns data 검색된 동 단위의 데이터
 */
export const getTownsCount = async () => {
  try {
    const { data } = await authAxios.get('/api/towns/count')

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * POST : 게시판 글 생성 관련 요청 api입니다.
 * @returns data 생성된 방에 대한 id 값
 */
export const postCreateBoard = async ({
  title,
  content,
  latitude,
  longitude,
}: boardCreateTypes) => {
  try {
    const { data } = await authAxios.post('/api/board', {
      params: {
        title: title,
        content: content,
        latitude: latitude,
        longitude: longitude,
      },
    })

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
