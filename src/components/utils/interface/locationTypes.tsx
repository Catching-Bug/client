/**
 * lat, lon : 위경도
 * region : 도시
 * city : 구 단위
 * town : 동 단위 그 이하
 * detailLocation : 상세주소
 */
export interface locationTypes {
  latitude?: number
  longitude?: number
  region?: string
  city?: string
  town?: string
  detailLocation?: string
}
