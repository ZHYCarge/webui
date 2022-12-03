import request from './request'

export const GetUserList = (data) => {
    return request({
        url: '/?s=App.User.Userlist',
        method:'POST',
        data
    })
}

export const ChangeUserStatus = (data) => {
    return request({
        url: '/?s=App.User.Userstatus',
        method:'POST',
        data
    })
}
export const AddUser = (data) => {
    return request({
        url: '/?s=App.User.Adduser',
        method:'POST',
        data
    })
}
export const DeleteUser = (data) => {
    return request({
        url: '/?s=App.User.Deleteuser',
        method: 'POST',
        data
    })
}
    export const EditUser = (data) => {
        return request({
            url: '/?s=App.User.Edituser',
            method: 'POST',
            data
        })
    }