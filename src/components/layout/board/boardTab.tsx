import Button from '../button/button'
interface boardTabTypes {
  setMode: (tabMode: string) => void
}

const BoardTab = ({ setMode }: boardTabTypes) => {
  return (
    <>
      <div className="tabContainer">
        <Button onClick={() => setMode('board')}>글</Button>
        <Button onClick={() => setMode('location')}>위치</Button>
        <Button onClick={() => setMode('match')}>매칭</Button>
      </div>

      <style jsx>{`
        .tabContainer {
          margin-top: 60px;
          margin-bottom: 10px;
          width: 98%;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          background-color: white;
          display: flex;
          justify-content: space-around;
          border-left: 1px solid lightseagreen;
        }
      `}</style>
    </>
  )
}

export default BoardTab
