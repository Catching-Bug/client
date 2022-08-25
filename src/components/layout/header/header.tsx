import Image from 'next/image'

interface headerTypes {
  onClick?: () => void
  title?: string
}

const Header = ({ onClick, title }: headerTypes) => {
  return (
    <>
      <header className="headerContainer">
        {onClick && (
          <button className="previousButton" onClick={onClick}>
            <Image
              width={50}
              height={45}
              src={'/previous_btn.png'}
              alt={'이전버튼'}
            ></Image>
          </button>
        )}
        {title && <h2 className="centerTitle">{title}</h2>}
      </header>

      <style jsx>{`
        .headerContainer {
          width: 100%;
          height: 50px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
        }

        .previousButton {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          background-color: white;
          cursor: pointer;
        }

        .centerTitle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default Header
