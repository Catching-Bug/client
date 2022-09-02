import { useDispatch } from 'react-redux'
import { postMatching } from '../../../core/api/employ'
import {
  saveEmployDatas,
  saveIsMatched,
} from '../../../core/redux/module/boardDatasSlice'

interface matchTypes {
  boardId: number
  employInfo: {
    employId: number
    employerId: number
    employeeId: number
    employerNickname: string
    employeeNickname: string
  }
  isMatch: string
}

const Match = ({ boardId, employInfo, isMatch }: matchTypes) => {
  const dispatch = useDispatch()

  const handleMatchTrial = async (boardId: number) => {
    try {
      const result = await postMatching(boardId)

      dispatch(saveEmployDatas(result.content.employ))
      dispatch(saveIsMatched({ isMatched: 'MATCHED' }))
    } catch (error) {
      console.log('handleMatchTrial 오류 발생')
    }
  }

  return (
    <>
      <div className="matchContainer">
        {isMatch === 'MATCHED' ? (
          <div className="matchedWrapper">
            <span>현재 매칭되어 있습니다.</span>
            <span>매칭자 : {employInfo.employerNickname}</span>
            {/* 여기에 매칭한 사람과 같은 id인 유저면 매칭 취소 보이게 */}
          </div>
        ) : (
          <div className="noMatchedWrapper">
            <span>아직 매칭되지 않았어요. 🥲</span>
            <span>현재 회원님께서 도와주실 수 있어요.</span>
            <button
              className="helpButton"
              type="button"
              onClick={() => {
                handleMatchTrial(boardId)
              }}
            >
              {employInfo.employeeNickname}님 도와주기
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .matchContainer {
          width: 98%;
          height: 300px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 1px solid lightcoral;
        }

        .matchedWrapper {
          display: flex;
          flex-direction: column;
        }

        .noMatchedWrapper {
          display: flex;
          flex-direction: column;
          text-align: center;
          align-items: center;
        }

        .helpButton {
          width: 150px;
          height: 30px;
          border-radius: 20px;
          border: 1px solid black;
          background-color: white;
          cursor: pointer;
        }

        span {
          margin: 10px 0;
        }
      `}</style>
    </>
  )
}

export default Match
