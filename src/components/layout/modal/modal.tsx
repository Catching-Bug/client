import { ReactNode, useRef } from 'react'

interface props {
  modalOpen: boolean
  toggleModalOpenStatus: () => void
  backgroundToggle?: boolean
  children: ReactNode
}

const Modal = ({
  modalOpen,
  toggleModalOpenStatus,
  backgroundToggle,
  children,
}: props) => {
  const backgroundRef = useRef(null)

  return (
    <>
      {modalOpen && (
        <div
          className="modalBackground"
          ref={backgroundRef}
          onClick={(event) => {
            if (backgroundToggle && backgroundRef.current === event.target) {
              toggleModalOpenStatus()
            }
          }}
        >
          {children}
        </div>
      )}
      <style jsx>{`
        .modalBackground {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          max-width: 1024px;
          z-index: 2;
          background-color: rgb(0, 0, 0, 0.7);
          animation: fadeIn 1s;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

export default Modal
