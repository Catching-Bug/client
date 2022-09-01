import { useEffect } from 'react'
import { useMapAction } from '../../../hooks/useMapAction'
import { useMapLoaded } from '../../../hooks/useMapLoaded'
import { mapAction } from '../../utils/interface/mapActions'

const Map = (props: mapAction) => {
  /**
   * map script가 Load되었을 시 map을 그립니다.
   * props는 맵에 필요한 특정 기능을 활성화 할 수 있게 합니다.
   */
  const { mapLoaded, onLoadKakaoMap } = useMapLoaded()

  /**
   * 서비스에 필요한 action의 로직이 모여있습니다
   */
  useMapAction(props)

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
          height: calc((var(--vh, 1vh) * 100));
        }
      `}</style>
    </>
  )
}

export default Map
