/**
 * map 컴포넌트의 각 기능에 대한 활성화 prop입니다.
 * showMyLocation : 내 위치 기반 표시하기
 * enableToGetMarker : 지도에 마커 찍기 활성화
 * address : 법정동 주소 가져오기
 * getAroundUserBoard : 내 주변 글 지도에 표시하기
 * markerOnClick : 마커 온클릭 함수
 */
export interface mapAction {
  showMyLocation?: boolean
  enableToGetMarker?: boolean
  address?: boolean
  getAroundUserBoard?: boolean
  markerOnClick?: () => void
}
