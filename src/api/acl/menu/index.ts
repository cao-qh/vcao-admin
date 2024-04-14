import request from '@/utils/request'
import type { PermisstionResponseData } from './type'

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
}

// 获取菜单数据
export const reqAllPermission = () =>
  request.get<any, PermisstionResponseData>(API.ALLPERMISSION_URL)
