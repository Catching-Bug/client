import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { RootState } from '../../core/redux/module/rootReducer'
import { useModal } from '../../hooks/useModal'
import Button from '../../components/layout/button/button'
import Map from '../../components/layout/map/map'
import Modal from '../../components/layout/modal/modal'

import MockAdapter from 'axios-mock-adapter'
import { authAxios } from '../../core/api/instance/authInstance'
import { defaultAxios } from '../../core/api/instance/defaultInstance'
import { useLocation } from '../../hooks/useLocation'
import { postCreateBoard } from '../../core/api/board'

/**
 * 위치 관련 요청에 대한 mock adapter
 */
if (typeof window !== 'undefined') {
  const authMock = new MockAdapter(authAxios)
  const defaultMock = new MockAdapter(defaultAxios)

  /**
   * 사용자 위치 전부 조회
   */
  authMock.onGet('/api/locations').reply(200, [
    {
      id: 0,
      latitude: 33,
      longitude: 125,
      region: '서울특별시',
      city: '서울구',
      town: '서울동',
      detailLocation: '서울아파트 103호',
    },
  ])

  /**
   * 사용자 위치 등록
   */
  authMock.onPost('/api/locations').reply(200, { id: 1 })

  authMock.onPost('/api/board').reply(200, { id: 2 })

  /**
   * 리프레시 토큰 intercept 요청
   */
  defaultMock
    .onPost('/api/token/refresh')
    .reply(200, { refreshToken: 'new refresh', accessToken: 'new access' })
}

const Create = () => {
  const router = useRouter()

  /**
   * select 태그에서 내가 선택한 option에 대한 index 값 저장
   */
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0)
  const handleChangeSelectedOption = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLocationIndex(Number(e.target.value))
  }

  /**
   * 게시판 글 생성을 위한 4가지 body 값
   * title,content,latitude,longitude
   */
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  /**
   * 글을 게시하도록 서버에 요청합니다
   * title, content, latitude, longitude 네 개의 값이 필요합니다
   */
  const requestBoardToServer = async () => {
    try {
      if (!myLocations.length || !title || !content) {
        alert('작성되지 않은 문항이 있거나 위치를 설정하지 않았습니다.')
        return
      }

      const { latitude, longitude } = getLatLon()

      const result = await postCreateBoard({
        title,
        content,
        latitude,
        longitude,
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 옵션에서 선택된 주소의 index를 통해 위치정보를 얻는 함수
   * @returns latitude, longitude
   */
  const getLatLon = () => {
    const selectedLocationInfo = myLocations.find((loc) => {
      if (loc.id === selectedLocationIndex) return loc
    })

    const { latitude, longitude } = selectedLocationInfo!

    return { latitude, longitude }
  }

  // 모달 상태 관리
  const { modalOpen, toggleModalOpenStatus } = useModal()

  /**
   * 위치정보 관련(추가 및 조회) 로직
   */
  const detailInputRef = useRef<any>()
  const { location } = useSelector((state: RootState) => state.locationSlice)
  const { myLocations, handleSetlocation } = useLocation(
    detailInputRef,
    toggleModalOpenStatus,
  )

  return (
    <>
      <div className="boardContainer">
        {/* 헤더 */}
        <header className="headerBar">
          <Button
            className="prevButton"
            onClick={() => {
              router.back()
            }}
          >
            <Image
              src={'/previous_btn.png'}
              width={40}
              height={40}
              alt={'뒤로가기'}
            ></Image>
          </Button>
          <h1>🐞도움청하기</h1>
          <Button
            className={'locationChangeButton'}
            onClick={toggleModalOpenStatus}
          >
            내 위치 변경
          </Button>
        </header>

        <div className="inputContainer">
          <label>이 곳이 현재 계신 곳이 맞으신가요?</label>
          <select className="inputBox" onChange={handleChangeSelectedOption}>
            {myLocations.map((loc, index) => {
              const text = `${loc.region} ${loc.city} ${loc.town} ${loc.detailLocation}`
              return (
                <option key={loc.id} value={index}>
                  {text}
                </option>
              )
            })}
          </select>
          <label htmlFor={'title'}>제목</label>
          <input
            className="inputBox"
            type={'text'}
            id={'title'}
            placeholder={'EX) 도와주세요'}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <label htmlFor={'description'}>내용</label>
          <textarea
            className="textareaBox"
            id={'description'}
            placeholder={'바퀴벌레 너무 커요..'}
            onChange={(e) => setContent(e.target.value)}
            maxLength={100}
          ></textarea>
        </div>

        <Button className="doneButton" onClick={requestBoardToServer}>
          완료
        </Button>
      </div>

      <Modal
        modalOpen={modalOpen}
        toggleModalOpenStatus={toggleModalOpenStatus}
      >
        <div className="modalContainer">
          <header className="modalHeaderBar">
            <h1>위치 선택하기</h1>
            <Button className="modalCloseBtn" onClick={toggleModalOpenStatus}>
              <Image
                src={'/previous_btn.png'}
                width={40}
                height={40}
                alt={'모달 닫기'}
              ></Image>
            </Button>
          </header>
          <Map showMyLocation enableToGetMarker address></Map>
          <div className="locationContainer">
            <label htmlFor="location">원 주소</label>
            <input
              className="locationInput"
              id="location"
              disabled
              placeholder={
                location ? location : '잘못된 위치이거나 없는 주소입니다.'
              }
            ></input>
            <label htmlFor="detail">상세 주소를 입력해주세요.</label>
            <input
              className="locationInput"
              id="detail"
              ref={detailInputRef}
            ></input>
            <Button className="doneButton" onClick={handleSetlocation}>
              선택 완료
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .boardContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
          background-color: #faf9f7;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          overflow-y: auto;
        }

        .headerBar {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
        }

        .inputContainer {
          max-width: 80%;
          width: 800px;
          display: flex;
          flex-direction: column;
          margin: 20px 0;
        }

        .inputBox {
          border-radius: 7px;
          width: 100%;
          height: 50px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          font-size: 1.3em;
          padding-left: 5px;
          margin: 20px 0;
        }

        .textareaBox {
          border-radius: 7px;
          width: 100%;
          height: 200px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          font-size: 1.3em;
          padding-left: 5px;
          margin: 20px 0;
        }

        .modalContainer {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 640px;
          height: 100%;
          max-height: 700px;
        }

        .modalHeaderBar {
          width: 100%;
          height: 50px;
          padding: 0 10px;
          background-color: white;
          display: flex;
          justify-content: space-between;
        }

        .locationContainer {
          width: 100%;
          height: 300px;
          background-color: white;
          padding: 6px 11px 0 11px;
          display: flex;
          flex-direction: column;
        }

        .locationInput {
          height: 30px;
          margin: 10px 0;
        }

        h1 {
          font-size: 1.5em;
        }

        label {
          color: gray;
        }

        p {
          margin: 0.3em 0;
        }
      `}</style>
    </>
  )
}

export default Create
