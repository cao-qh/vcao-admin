import type { ResponsePage } from '@/api/type'

export interface AddActivityResponseData extends Response {
  object: AddActivityObject
}

interface AddActivityObject extends ResponsePage {
  list: List[]
}

interface List {
  id: number
  status: number
  price: number
  startDay: number
  endDay: number
  collPrice: number
  monthNum: number
}
