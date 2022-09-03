/**
 * 로그인을 하지 않은 유저에게 경고창을 띄웁니다.
 * @param loginStatus 로그인 상태
 */
export const handleNotLoginExecption = (loginStatus: boolean) => {
  if (!loginStatus) {
    alert('로그인을 하셔야 사용하실 수 있습니다.')
    return false
  }

  return true
}
