import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Loading from '../../components/layout/loading/loading'
import { getAuthLogin } from '../../core/api/user'
import MockAdapter from 'axios-mock-adapter'
import { defaultAxios } from '../../core/api/instance/defaultInstance'

/**
 * login request mock adapter
 */
if (typeof window !== 'undefined') {
  const mock = new MockAdapter(defaultAxios)

  mock.onGet('/api/login/oauth', { params: { code: 'code' } }).reply(200, {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    gender: 'male',
    nickName: 'nickname',
  })
}

const Callback = () => {
  const router = useRouter()

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

      // const result = await getAuthLogin({ code: 'code' })
      const result = await getAuthLogin(authCode)

      localStorage.setItem('uat', result.accessToken)
      localStorage.setItem('urt', result.refreshToken)

      router.replace('/')
    } catch (error) {
      console.log(error)
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
