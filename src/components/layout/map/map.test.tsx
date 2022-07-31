import { useMapLoaded } from '../../../hooks/useMapLoaded'
import { act, renderHook } from '@testing-library/react-hooks'

describe('should change mapLoaded', () => {
  const { result } = renderHook(() => useMapLoaded())

  test('before render kakaoMap', async () => {
    expect(result.current.mapLoaded).toBe(false)

    act(() => {
      result.current.setMapLoaded(true)
    })
  })

  test('after render kakaoMap', () => {
    expect(result.current.mapLoaded).toBe(true)

    const kakaoMap = document.querySelector('MapContainer')

    expect(kakaoMap).toBeInTheDocument()
  })
})
