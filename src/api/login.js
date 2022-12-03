import request from './request'


export const login = (data) => {
  return request({
    url: '/?s=App.User.Login',
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