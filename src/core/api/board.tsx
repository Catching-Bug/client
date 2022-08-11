import { authAxios } from './instance/authInstance'

/**
 * POST : 게시판 글 생성 관련 요청 api입니다.
 * @returns data 생성된 방에 대한 id 값
 */
export const postCreateBoard = async () => {
  try {
    const { data } = await authAxios.post('/api/board')

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
