import request from '@/utils/request'
import type {
  HasSpuResponseData,
  AllTrademark,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from './type'

enum API {
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性[颜色、版本、尺码]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
}

export const reqHasSpu = (page: number, limit: number, category3Id: number) => {
  return request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

export const reqAllTradeMark = () => {
  return request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)
}

export const reqSpuImageList = (spuId: number) => {
  return request.get(API.IMAGE_URL + spuId)
}

export const reqSpuHasSaleAttr = (spuId: number) => {
  return request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
}

// 获取全部的销售属性
export const reqAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}
