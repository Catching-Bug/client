interface boardBodyType {
  title: string
  content: string
  creatorNickname: string
  createTime: string
}

const Body = ({
  title,
  content,
  creatorNickname,
  createTime,
}: boardBodyType) => {
  return (
    <>
      <p className="creator">{creatorNickname}</p>
      <h1 className="title">{title}</h1>
      <p className="content">{content}</p>
      <p className="createTime">{createTime}</p>

      <style jsx>{`
        .title {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 10px 0;
          font-size: 1.3em;
        }

        .creator {
          font-size: 0.8em;
          font-weight: bold;
        }

        .content {
          font-size: 1em;
          word-wrap: break-word;
        }

        .commentCounter {
          color: darkblue;
          font-size: 0.7em;
          margin: 5px;
          /* padding-top: 20px; */
        }

        .createTime {
          font-size: 0.7em;
          margin: 0;
          margin: 5px;
        }
      `}</style>
    </>
  )
}

export default Body
