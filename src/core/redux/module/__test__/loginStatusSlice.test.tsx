import loginStatusSlice, { saveLoginStatus } from '../loginStatusSlice'

describe('reducer', () => {
  describe('loginStatus', () => {
    it('change loginStatus', () => {
      const state = loginStatusSlice(
        {
          loginStatus: false,
        },
        saveLoginStatus({
          loginStatus: true,
        }),
      )

      expect(state.loginStatus).toBeTruthy()
    })
  })
})
