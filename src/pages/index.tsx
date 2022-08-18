import type { NextPage } from 'next'
import ModalBottomSheet from '../components/layout/BottomSheet/bottomSheet'
import Button from '../components/layout/button/button'
import Image from 'next/image'
import Map from '../components/layout/map/map'
import NavBar from '../components/layout/bottomNav/navBar'
import { RootState } from '../core/redux/module/rootReducer'
import { useSelector } from 'react-redux'
import { useCreateBoard } from '../hooks/useCreateBoard'
import { useCenterBtn } from '../hooks/useCenterBtn'
import { useBottomSheet } from '../hooks/useBottomSheet'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { modalOpen } = useSelector((state: RootState) => state.modalOpenSlice)

  // 글 생성 버튼 Fn
  const { createBoard } = useCreateBoard()

  // 내 위치로 이동 Fn
  const { handleMoveToCenter } = useCenterBtn()

  // 바텀 시트 닫기 Fn
  const { closeBottomSheet } = useBottomSheet()

  useEffect(() => {
    console.log('appkey=', process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY)
  }, [])

  return (
    <>
      <Map showMyLocation>
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
      </Map>

      {!modalOpen && <NavBar />}
    </>
  )
}

export default Home
