import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'

enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类接口地址
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下已有的属性玉属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或修改已有属性
  ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
  // 删除某一个已有属性
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

// 获取二级分类接口方法
export const reqC2 = (category1Id: number) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)

// 获取三级分类接口方法
export const reqC3 = (category2Id: number) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)

// 获取对应分类下已有的属性与属性值接口
export const reqAttr = (
  category1Id: number,
  category2Id: number,
  category3Id: number,
) => {
  return request.get<any, AttrResponseData>(
    API.ATTR_URL + category1Id + '/' + category2Id + '/' + category3Id,
  )
}

// 添加或修改已有属性
export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<any, any>(API.ADDORUPDATE_URL, data)
}

// 删除某一个已有属性
export const reqRemoveAttr = (attrId: number) => {
  return request.delete<any, any>(API.DELETEATTR_URL + attrId)
}
