import Image from 'next/image'

const CenterMoveButton = () => {
  return (
    <>
      <button className="centerMoveBtn" type="button">
        <Image width={40} height={40} src={'/current_location.png'}></Image>
      </button>

      <style jsx>{`
        .centerMoveBtn {
          position: absolute;
          right: 10px;
          bottom: 100px;
          z-index: 9998;
          width: 40px;
          height: 40px;
          border: 0;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default CenterMoveButton
