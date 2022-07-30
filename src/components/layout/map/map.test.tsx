import { useMapLoaded } from '../../../hooks/useMapLoaded'
import { act, renderHook } from '@testing-library/react-hooks'

describe('should change mapLoaded', () => {
  const latitude: number = 33.5563
  const longitude: number = 126.79581
  const { result } = renderHook(() => useMapLoaded(latitude, longitude))

  test('before render kakaoMap', async () => {
    expect(result.current.mapLoaded).toBe(false)

    act(() => {
      result.current.setMapLoaded(true)
    })
  })

  test('after render kakaoMap', () => {
    expect(result.current.mapLoaded).toBe(true)
  })
})
