const Match = () => {
  return (
    <>
      <div className="matchContainer"></div>
      <style jsx>{`
        .matchContainer {
          width: 98%;
          height: 300px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          display: flex;
          flex-direction: column;
          align-items: center;
          border-left: 1px solid lightcoral;
        }
      `}</style>
    </>
  )
}

export default Match
