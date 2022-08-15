import { authAxios } from './instance/authInstance'

interface boardCreateTypes {
  title: string
  content: string
  latitude: number
  longitude: number
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
