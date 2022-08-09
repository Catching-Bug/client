import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '../../../core/redux/module/rootReducer'

const CenterMoveButton = () => {
  const { map } = useSelector((state: RootState) => state.kakaoMapSlice)
  const { latitude, longitude } = useSelector(
    (state: RootState) => state.centerLatLonSlice,
  )

  /**
   * 내 위치 이동 버튼
   * kakaomap에 사용되는 LatLng 객체 저장
   * panTo는 자연스럽게 화면을 이동시킵니다.
   */
  const handleMoveToCenter = () => {
    if (!map) return

    const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude)

    map.panTo(moveLatLon)
  }

  return (
    <>
      <button
        className="centerMoveBtn"
        type="button"
        onClick={handleMoveToCenter}
      >
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
