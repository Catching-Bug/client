import Image from 'next/image'
import Link from 'next/link'

/**
 * Bottom Navigation Bar Component
 */
const NavBar = () => {
  return (
    <>
      <nav className="navBarContainer">
        <div className="navBarItems">
          <Link href={'/main'}>
            <button className="ItemButton" type="button">
              <Image src={`/home_icon.png`} width="30px" height="30px"></Image>
            </button>
          </Link>
        </div>
        <div className="navBarItems">
          <Link href={'/'}>
            <button className="ItemButton" type="button">
              <Image src={`/map_icon.png`} width="30px" height="30px"></Image>
            </button>
          </Link>
        </div>
      </nav>

      <style jsx>{`
        .navBarContainer {
          position: absolute;
          bottom: 0;
          margin: 10px;
          width: 95%;
          max-width: 340px;
          height: 7%;
          min-height: 40px;
          display: flex;
          z-index: 9999;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          animation: fadeInUp 1s;
        }

        .navBarItems {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
        }

        .ItemButton {
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

export default NavBar
