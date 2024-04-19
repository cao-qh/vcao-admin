export interface RequestParams {
  currentPage: number
  pageSize: number
  [key: string]: any
}

export interface Response {
  code: string
  msg: string
  object: null | object
}

export interface ResponsePage {
  totalPages: number
  currentPage: number
  pageSize: number
  totalSize: number
}
