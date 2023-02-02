import request from './request'


export const login = (data) => {
  return request({
    url: '/?s=App.User.Login',
    method: 'POST',
    data
  })
}
export const auth_code = (data) => {
  return request({
    url: '/?s=App.Web.Get_authcode',
    method: 'get',
    data
  })
}
export const VerifyCode = (data) => {
  return request({
    url: '/?s=App.Web.VerifyCode',
    method: 'POST',
    data
  })
}

export const auth = (data) => {
  return request({
    url: '/?s=App.User.Auth',
    method: 'POST',
    data
  })
}