import request from '@/utils/request'
import type { AddActivityResponseData } from './type'
import type { RequestParams } from '@/api/type'

enum API {
  ADD_ACTIVITY_URL = '/admin/selectDiscounts',
}

export const reqAddActivity = (data: RequestParams) => {
  return request.post<AddActivityResponseData>(API.ADD_ACTIVITY_URL, data)
}
