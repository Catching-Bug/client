import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Loading from '../../components/layout/loading/loading'
import { getAuthLogin } from '../../core/api/user'
import {
  saveLoginStatus,
  saveLoginUserInfo,
} from '../../core/redux/module/loginStatusSlice'

const Callback = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  /**
   * url query param의 code를 가져옵니다.
   * @returns authorizationCode kakao 인가코드를 반환
   */
  const getAuthorizationCode = () => {
    const authorizationCode = new URL(window.location.href).searchParams.get(
      'code',
    )

    return { code: authorizationCode }
  }

  /**
   * getAuthLogin을 이용해 로그인을 요청하는 함수
   */
  const loginRequest = async () => {
    try {
      const authCode = getAuthorizationCode()

      const result = await getAuthLogin(authCode)

      localStorage.setItem('uat', result.accessToken)
      localStorage.setItem('urt', result.refreshToken)

      dispatch(saveLoginStatus({ loginStatus: true }))
      dispatch(
        saveLoginUserInfo({
          loginUserInfo: {
            gender: result.gender,
            nickName: result.nickName,
          },
        }),
      )

      router.replace('/')
    } catch (error) {
      console.log('callback login error')
      router.replace('/')
    }
  }

  useEffect(() => {
    loginRequest()
  }, [])

  return (
    <>
      <div className="loadingContainer">
        <Loading />
      </div>

      <style jsx>{`
        .loadingContainer {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}

export default Callback
