// 书写品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取已有的品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
