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
export const getCitiesCount = async (regionName: string) => {
  try {
    const { data } = await authAxios.get('/api/cities/count', {
      params: { regionName: regionName },
    })

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * GET : 동 단위의 위 경도 및 글 수를 조회합니다
 * @returns data 검색된 동 단위의 데이터
 */
export const getTownsCount = async (cityName: string) => {
  try {
    const { data } = await authAxios.get('/api/towns/count', {
      params: { cityName: cityName },
    })

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * GET : 현재 위치의 게시글들을 조회합니다
 * @param townName 검색할 위치의 동 단위 이름
 * @returns 동 단위로 검색한 게시글들을 반환합니다
 */
export const getBoardList = async (
  townName: string,
  size: number,
  page: number,
) => {
  try {
    const { data } = await authAxios.get('/api/boards', {
      params: { townName: townName, size: size, page: page },
    })

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * GET : 게시글에 대한 정보를 받아옵니다.
 * @param id board primary key
 * @returns data 게시글 정보
 */
export const getBoardOnce = async (id: number) => {
  try {
    const { data } = await authAxios.get(`/api/board/${id}`)

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
