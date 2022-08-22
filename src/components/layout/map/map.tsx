import { useEffect } from 'react'
import { useMapActions } from '../../../hooks/useMapActions'
import { mockingCustomOverlay } from '../../../__mocks__/axiosMock'
import { mapAction } from '../../utils/interface/mapActions'

mockingCustomOverlay()

const Map = (props: mapAction) => {
  /**
   * map script가 Load되었을 시 map을 그립니다.
   * props는 맵에 필요한 특정 기능을 활성화 할 수 있게 합니다.
   */
  const { mapLoaded, onLoadKakaoMap } = useMapActions(props)

  useEffect(() => {
    if (!mapLoaded) return

    onLoadKakaoMap()
  }, [mapLoaded])

  return (
    <>
      <div className="MapContainer" id="map">
        kakaoMap
        {props.children}
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
