declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_KAKAO_MAP_APP_KEY: string
      KAKAO_CLIENT_SECRET: string
      NEXT_PUBLIC_SERVER_API_ENDPOINT: string
      NEXT_PUBLIC_KAKAO_LOGIN: string
    }
  }
}

export {}
