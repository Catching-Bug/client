import { commentInViewTypes } from './commentInViewTypes'

export interface commentFetchDataTypes {
  message: string
  content: {
    content: commentInViewTypes[] | []
    pegeable: {
      sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
      }
      pageNumber: number
      pageSize: number
      offset: number
      paged: boolean
      unpaged: boolean
    }
    totalPages: number
    totalElements: number
    last: boolean
    numberOfElements: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    size: number
    number: number
    first: boolean
    empty: boolean
  }
}
