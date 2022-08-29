const Comment = () => {
  return (
    <>
      <div className="commentWrapper">
        <p className="userBox">익명</p>
        <p className="dateBox">2022.08.29</p>
        <p className="commentBox">
          ㅎㅇㅎㅇㅎㅎㅎㅎㅎㅎㅎㅇㅎㅇㅎㅎㅎㅎㅎㅎㅎㅇㅎㅇㅎㅎㅎㅎㅎㅎ
        </p>
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
