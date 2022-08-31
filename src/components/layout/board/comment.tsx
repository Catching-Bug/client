import { commentInViewTypes } from '../../utils/interface/commentInViewTypes'

const Comment = ({
  commentedAt,
  commenterNickname,
  content,
}: commentInViewTypes) => {
  return (
    <>
      <div className="commentWrapper">
        <p className="userBox">{commenterNickname}</p>
        <p className="dateBox">{commentedAt}</p>
        <p className="commentBox">{content}</p>
      </div>
      <hr />

      <style jsx>{`
        .commentWrapper {
          width: 100%;
          /* background-color: white; */
        }

        .userBox {
          padding: 10px;
          margin: 0;
        }

        .dateBox {
          padding-left: 10px;
          color: gray;
          font-size: 0.8em;
          margin: 0;
        }

        .commentBox {
          width: 100%;
          padding: 10px;
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default Comment
