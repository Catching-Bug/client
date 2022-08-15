import userInfoSlice, {
  saveBasicsOfUser,
  saveLocationOfUser,
} from './userInfoSlice'

describe('reducer', () => {
  describe('userInfo', () => {
    it('change basicsInfo', () => {
      const state = userInfoSlice(
        {
          nickname: '',
          gender: '',
          region: '',
          city: '',
          town: '',
          detailLocation: '',
        },
        saveBasicsOfUser({
          nickname: 'testUser',
          gender: 'male',
        }),
      )

      expect(state.nickname).toBe('testUser')
      expect(state.gender).toBe('male')
    })

    it('change locationInfo', () => {
      const state = userInfoSlice(
        {
          nickname: '',
          gender: '',
          region: '',
          city: '',
          town: '',
          detailLocation: '',
        },
        saveLocationOfUser({
          region: '서울특별시',
          city: '서울구',
          town: '서울동',
          detailLocation: '서울아파트 101호',
        }),
      )

      expect(state.region).toBe('서울특별시')
      expect(state.city).toBe('서울구')
      expect(state.town).toBe('서울동')
      expect(state.detailLocation).toBe('서울아파트 101호')
    })
  })
})
