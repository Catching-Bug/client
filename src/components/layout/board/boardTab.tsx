interface boardTabTypes {
  setMode: (tabMode: string) => void
}

const BoardTab = ({ setMode }: boardTabTypes) => {
  return (
    <>
      <div className="tabContainer">
        <button
          onClick={() => setMode('board')}
          type="button"
          data-testid="boardButton"
        >
          글
        </button>
        <button
          onClick={() => setMode('location')}
          type="button"
          data-testid="locationButton"
        >
          위치
        </button>
        <button
          onClick={() => setMode('match')}
          type="button"
          data-testid="matchButton"
        >
          매칭
        </button>
      </div>

      <style jsx>{`
        .tabContainer {
          width: 98%;
          min-height: 30px;
          margin-top: 60px;
          margin-bottom: 10px;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          background-color: white;
          display: flex;
          justify-content: space-around;
          border-left: 1px solid lightseagreen;
        }

        button {
          width: 100%;
          border: none;
          background-color: white;
          cursor: pointer;
          font-size: 1.1em;
        }

        button:hover {
          background-color: rgb(211, 211, 211, 0.3);
        }
      `}</style>
    </>
  )
}

export default BoardTab
