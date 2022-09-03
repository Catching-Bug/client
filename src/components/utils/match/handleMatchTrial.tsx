import { postMatching } from '../../../core/api/employ'
import { Dispatch } from 'react'
import {
  saveEmployDatas,
  saveIsMatched,
} from '../../../core/redux/module/boardDatasSlice'
import { handleNotLoginExecption } from '../login/handleNotLoginException'

/**
 * 매칭 버튼을 눌렀을 시 요청합니다
 * @param boardId 게시글의 primary key 값
 * @param loginStatus 로그인 상태
 * @param dispatch dispatch를 위한 props
 */
export const handleMatchTrial = async (
  boardId: number,
  loginStatus: boolean,
  dispatch: Dispatch<any>,
) => {
  try {
    if (!handleNotLoginExecption(loginStatus)) return

    const result = await postMatching(boardId)

    dispatch(saveEmployDatas(result.content.employ))
    dispatch(saveIsMatched({ isMatched: 'MATCHED' }))
  } catch (error) {
    console.log('handleMatchTrial 오류 발생')
  }
}
