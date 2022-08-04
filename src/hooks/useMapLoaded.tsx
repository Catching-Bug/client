import { useEffect, useState } from 'react'

export const useMapLoaded = () => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  useEffect(() => {
    const $script = document.createElement('script')
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`
    $script.addEventListener('load', () => setMapLoaded(true))
    document.head.appendChild($script)
  }, [])

  return { mapLoaded }
}
