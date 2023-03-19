import request from '@/utils/request'

export function queryAll(data) {
  return request({
    url: `/ops/queryAll`,
    method: 'post',
    data
  })
}

export function exec(id) {
   return request({
      url: `/ops/execute/${id}`,
      method: 'get'
  })
}

export function del(id) {
    return request({
      url: `/ops/delete/${id}`,
      method: 'get'
    })
}

export function getById(id) {
    return request({
      url: `/ops/get/${id}`,
      method: 'get',
    })
}

export function create(data) {
    return request({
      url: '/ops/create',
      method: 'post',
      data
    })
}

export function getTask(data) {
    return request({
      url: '/opstask/getTaskList',
      method: 'post',
      data
    })
}

export function getResult(data) {
    return request({
      url: '/opstask/getResult',
      method: 'post',
      data
    })
}
  
