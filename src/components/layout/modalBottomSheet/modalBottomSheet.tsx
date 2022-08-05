interface props {
  closeBottomSheet: () => void
}

const ModalBottomSheet = ({ closeBottomSheet }: props) => {
  return (
    <>
      <div className="bottomSheetContainer">
        <button className="closeBtn" type="button" onClick={closeBottomSheet}>
          X
        </button>
      </div>

      <style jsx>{`
        .bottomSheetContainer {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 9998;
          width: 100%;
          height: 300px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgb(0 0 0);
          animation: fadeInUp 1s;
        }

        .closeBtn {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          border: none;
          background-color: white;
          cursor: pointer;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translateZ(0);
          }
        }
      `}</style>
    </>
  )
}

export default ModalBottomSheet
