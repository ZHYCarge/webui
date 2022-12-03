import request from './request'

export const menuList = () => {
  return request({
    url: '/?s=App.Web.menu'
  })
}

export const AboutImg = () => {
  return request({
    url: '/?s=App.Web.AboutImg'
  })
}

export const Img_404 = () => {
  return request({
    url: '/?s=App.Web.Img_404'
  })
}