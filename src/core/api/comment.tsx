import { commentPostTypes } from '../../components/utils/interface/commentPostTypes'
import { authAxios } from './instance/authInstance'

/**
 *
 * @param boardId 조회하려는 글의 primary key 값
 * @returns data 댓글에 대한 Json Data
 */
export const getComments = async (boardId: number) => {
  try {
    const { data } = await authAxios.get(`/api/comments/${boardId}`)

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}

/**
 *
 * @param boardId 글 조회를 위한 primary key 값
 * @param myInputComment 내가 작성한 댓글 값
 * @returns data 등록된 데이터의 정보
 */
export const postComment = async ({
  boardId,
  myInputComment,
}: commentPostTypes) => {
  try {
    const { data } = await authAxios.post(`/api/comment/${boardId}`, {
      comment: myInputComment,
    })

    return data
  } catch (error) {
    console.log('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
  }
}
