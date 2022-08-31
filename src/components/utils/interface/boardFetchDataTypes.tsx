export interface boardFetchDataTypes {
  message: string
  content: {
    id: number
    region: string
    city: string
    town: string
    detailLocation: string
    createdTime: string
    roomTitle: string
    roomContent: string
    creatorNickname: string
    creatorId: number
    latitude: number
    longitude: number
    status: string
    employ: {
      employId: number
      employerId: number
      employeeId: number
      employeeNickname: string
      employerNickname: string
    }
  }
}
