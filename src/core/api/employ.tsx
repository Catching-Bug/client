import { authAxios } from './instance/authInstance'

/**
 * 매칭 요청을 시도하는 API
 * @param boardId 게시판 조회를 위한 primary key
 * @returns data 매칭된 정보
 */
export const postMatching = async (boardId: number) => {
  try {
    const { data } = await authAxios.post(`/api/employ/${boardId}`)

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 * 매칭 취소에 관한 API
 * @param employId 매칭을 취소하는 유저의 primary key
 * @returns data 취소한 매칭에 대한 정보
 */
export const deleteMatching = async (employId: number) => {
  try {
    const { data } = await authAxios.delete(`/api/employ/${employId}`)

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
