import request from '@/utils/requestNew'

// 登录模块
export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}

export function register(params) {
  return request({
    url: '/register',
    method: 'post',
    params: params
  })
}

// 分类模块
export function categorySearch(params) {
  return request({
    url: '/book/category',
    method: 'get',
    params: params
  })
}
export function categoryAdd(params) {
  return request({
    url: '/book/category',
    method: 'post',
    data: params
  })
}
export function categoryGet(params) {
  return request({
    url: '/book/category/' + params.id,
    method: 'get'
  })
}
export function categorySet(params) {
  return request({
    url: '/book/category/' + params.id,
    method: 'put',
    data: params
  })
}
export function categoryDel(params) {
  return request({
    url: '/book/category/' + params.id,
    method: 'delete'
  })
}

// 图书模块
export function infoSearch(params) {
  return request({
    url: '/book/info',
    method: 'get',
    params: params
  })
}
export function infoAdd(params) {
  return request({
    url: '/book/info',
    method: 'post',
    data: params
  })
}
export function infoGet(params) {
  return request({
    url: '/book/info/' + params.id,
    method: 'get'
  })
}
export function infoDel(params) {
  return request({
    url: '/book/info/' + params.id,
    method: 'delete',
    data: params || {}
  })
}

export function infoSet(params) {
  return request({
    url: '/book/info/' + params.id,
    method: 'put',
    data: params || {}
  })
}
export function infoUp(params) {
  return request({
    url: '/book/info/' + params.id + '/listing',
    method: 'put'
  })
}
export function infoDown(params) {
  return request({
    url: '/book/info/' + params.id + '/delisting',
    method: 'put'
  })
}

// 标签模块
export function lableSearch(params) {
  return request({
    url: '/book/lable',
    method: 'get',
    params: params
  })
}
export function lableAdd(params) {
  return request({
    url: '/book/lable',
    method: 'post',
    data: params
  })
}
export function lableGet(params) {
  return request({
    url: '/book/lable/' + params.id,
    method: 'get'
  })
}
export function lableSet(params) {
  return request({
    url: '/book/lable/' + params.id,
    method: 'put',
    data: params
  })
}
export function lableDel(params) {
  return request({
    url: '/book/lable/' + params.id,
    method: 'delete'
  })
}

// 用户模块
export function userSearch(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params: params
  })
}
export function userDetail(params) {
  return request({
    url: '/user/info/' + params.id,
    method: 'get',
    params: params
  })
}
export function userDelete(params) {
  return request({
    url: '/user/info/' + params.id,
    method: 'delete',
    data: params
  })
}
export function userDisable(params) {
  return request({
    url: '/user/info/' + params.id + '/status/disable',
    method: 'put',
    data: params
  })
}
export function userEnable(params) {
  return request({
    url: '/user/info/' + params.id + '/status/enable',
    method: 'put',
    data: params
  })
}
export function userGetState(params) {
  return request({
    url: '/user/info/' + params.id + '/status',
    method: 'put',
    data: params
  })
}
export function userRechargeSearch(params) {
  return request({
    url: '/user/account-recharge',
    method: 'get',
    params: params
  })
}
export function userRechargeGet(params) {
  return request({
    url: '/user/account-recharge/' + params.id,
    method: 'get',
    params: params
  })
}
export function userWithdrawSearch(params) {
  return request({
    url: '/user/account-withdraw',
    method: 'get',
    params: params
  })
}
export function userWithdrawGet(params) {
  return request({
    url: '/user/account-withdraw/' + params.id,
    method: 'get',
    params: params
  })
}
export function userWithdrawGetState(params) {
  return request({
    url: '/user/account-withdraw/' + params.id + '/status/paid',
    method: 'get'
  })
}
// 设置模块
export function settingExchange(params) {
  return request({
    url: '/settings/exchange-rule',
    method: 'get',
    params: params
  })
}
export function settingExchangeSet(params) {
  return request({
    url: '/settings/exchange-rule',
    method: 'put',
    data: params
  })
}
export function settingCommission(params) {
  return request({
    url: '/settings/commission-rule',
    method: 'get',
    params: params
  })
}
export function settingCommissionSet(params) {
  return request({
    url: '/settings/commission-rule',
    method: 'put',
    data: params
  })
}
// 章节模块
export function sectionSearch(params) {
  return request({
    url: '/book/section',
    method: 'get',
    params: params
  })
}
export function sectionAdd(params) {
  return request({
    url: '/book/section',
    method: 'post',
    data: params
  })
}
export function sectionGet(params) {
  return request({
    url: '/book/section/' + params.id,
    method: 'get'
  })
}
export function sectionSet(params) {
  return request({
    url: '/book/section/' + params.id,
    method: 'put',
    data: params
  })
}
export function sectionDel(params) {
  return request({
    url: '/book/section/' + params.id,
    method: 'delete'
  })
}

// 营销模块
export function marketingSearch(params) {
  return request({
    url: '/marketing',
    method: 'get',
    params: params
  })
}
export function marketingAdd(params) {
  return request({
    url: '/marketing',
    method: 'post',
    data: params
  })
}
export function marketingSet(params) {
  return request({
    url: '/marketing/' + params.id,
    method: 'put',
    data: params
  })
}

export function marketingDel(params) {
  return request({
    url: '/marketing/' + params.id,
    method: 'delete',
    data: params
  })
}

// 订单模块
export function getHomeData(params) {
  return request({
    url: '/home',
    method: 'get',
    params: params
  })
}
export function orderSearch(params) {
  return request({
    url: '/order/info',
    method: 'get',
    params: params
  })
}

export function orderInfo(params) {
  return request({
    url: '/order/info/' + params.id,
    method: 'get',
    data: params
  })
}

// 获取token
export async function getQiNiuToken(params) {
  const res = await request({
    url: '/qiniu/upload-token',
    method: 'get',
    params: params || {}
  })
  return res
}
