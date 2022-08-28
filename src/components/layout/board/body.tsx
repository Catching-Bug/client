interface boardBodyType {
  title: string
  content: string
  creatorNickname: string
}

const Body = ({ title, content, creatorNickname }: boardBodyType) => {
  return (
    <>
      <body className="bodyContainer">
        <span className="creator">{creatorNickname}</span>
        <h1 className="title">{title}</h1>
        <p className="content">{content}</p>
        <span className="commentCounter">2</span>
      </body>

      <style jsx>{`
        .bodyContainer {
          margin-top: 60px;
          margin-bottom: 10px;
          width: 100%;
          /* height: calc(var(--vh, 1vh) * 100); */
          background-color: white;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          overflow-y: auto;
          padding: 10px;
        }

        .title {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 21px;
          margin: 10px 0;
          font-size: 1.3em;
        }

        .creator {
          font-size: 0.8em;
          font-weight: bold;
        }

        .content {
          word-wrap: break-word;
        }

        .commentCounter {
          color: darkblue;
          font-size: 0.7em;
        }
      `}</style>
    </>
  )
}

export default Body
