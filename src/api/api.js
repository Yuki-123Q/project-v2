//把对应接口请求封装成api调用
import service from '../service.js';

// 登录
export function login(data){
    return service({
        method: 'post',
        url: '/login',
        data
    })
}
//获取学生列表
export function GetStudents(data){
    console.log(data)
    return service({
        method: 'get',
        url: '/users',
        data
    })
}
// 删除学生
export function DeleteStudent(id){
    return service({
        method: 'delete',
        url: '/student',
        id
    })
}
//获取信息列表
export function GetStudentInfo(data){
    return service({
        method: 'get',
        url: '/info',
        data
    })
}
//新增信息
export function AddStudentInfo(data){
    return service({
        method: 'post',
        url: '/info',
        data
    })
}
//修改信息
export function UpdateStudentInfo(data){
    return service({
        method: 'put',
        url: '/info',
        data
    })
}
//删除信息
export function DeleteStudentInfo(data){
    return service({
        method: 'delete',
        url: '/info',
        data
    })
}
// 数据概览
export function GetDataView(){
    return service({
        method: 'get',
        url: '/dataview'
    })
}