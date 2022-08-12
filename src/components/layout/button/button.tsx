import React, { ReactNode } from 'react'

interface props {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: ReactNode
}

/**
 * 현 서비스에 사용되는 모든 버튼에 공통적으로 사용되는
 * 컴포넌트 모듈입니다.
 * @param props 클래스 이름, 클릭 함수, 하위 Element에 대한 Node
 */
const Button = ({ className, onClick, children }: props) => {
  return (
    <>
      <button className={className} type="button" onClick={onClick}>
        {children}
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

        .loginButtonContainer {
          padding: 0;
          border-radius: 20px;
          width: 183px;
          height: 43px;
        }

        .creatingBtn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 9998;
          width: 40px;
          height: 40px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 /16%);
          cursor: pointer;
        }

        .prevButton {
          background-color: rgba(255, 255, 255, 0);
        }

        .doneButton {
          background-color: #5b6fd8;
          width: 100%;
          height: 50px;
          min-height: 50px;
          font-size: 1.5em;
          color: white;
        }

        .locationChangeButton {
          background-color: rgba(255, 255, 255, 0);
          color: blue;
        }

        .modalCloseBtn {
          float: right;
        }

        button {
          border: none;
          cursor: pointer;
          background-color: rgb(0, 0, 0, 0);
        }
      `}</style>
    </>
  )
}

export default Button
