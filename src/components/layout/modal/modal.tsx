import { useSelector } from 'react-redux'
import { RootState } from '../../../core/redux/module/rootReducer'

const Modal = () => {
  const modalShow = useSelector((state: RootState) => state.modalOpenSlice)

  return (
    <>
      {modalShow && <div className="bottom"></div>}
      <style jsx>{`
        .bottom {
          width: 1000px;
          height: 1000px;
          background-color: red;
          z-index: 9999;
        }
      `}</style>
    </>
  )
}

export default Modal
