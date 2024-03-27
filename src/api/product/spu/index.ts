import request from '@/utils/request'

enum API {
  HASSPU_URL = '/admin/product/',
}

export const reqHasSpu = (page: number, limit: number, category3Id: number) => {
  return request.get(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}
