import { useEffect } from 'react'
import { useMapLoaded } from '../../../hooks/useMapLoaded'
import ModalBottomSheet from '../modalBottomSheet/modalBottomSheet'
import Button from '../button/button'
import Image from 'next/image'
import { useBottomSheet } from '../../../hooks/useBottomSheet'
import { useCenterBtn } from '../../../hooks/useCenterBtn'
import { useCreateBoard } from '../../../hooks/useCreateBoard'

const Map = () => {
  const { mapLoaded, onLoadKakaoMap } = useMapLoaded()

  /**
   * map script가 Load되었을 시 map을 그립니다.
   */
  useEffect(() => {
    if (!mapLoaded) return

    onLoadKakaoMap()
  }, [mapLoaded])

  // 글 생성 버튼 Fn
  const { createBoard } = useCreateBoard()

  // 내 위치로 이동 Fn
  const { handleMoveToCenter } = useCenterBtn()

  // 바텀 시트 닫기 Fn
  const { closeBottomSheet } = useBottomSheet()

  return (
    <>
      <div className="MapContainer" id="map">
        kakaoMap
        <Button className="creatingBtn" onClick={createBoard}>
          <Image
            width={40}
            height={40}
            src={'/create_board_btn.png'}
            alt={'글생성'}
          ></Image>
        </Button>
        <Button className="centerMoveBtn" onClick={handleMoveToCenter}>
          <Image
            width={40}
            height={40}
            src={'/current_location.png'}
            alt={'내위치이동'}
          ></Image>
        </Button>
        <ModalBottomSheet closeBottomSheet={closeBottomSheet} />
      </div>

      <style jsx>{`
        .MapContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default Map
