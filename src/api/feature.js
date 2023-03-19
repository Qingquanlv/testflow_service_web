import request from '@/utils/request'

export function queryAll(data) {
  return request({
    url: `/feature/queryAll`,
    method: 'post',
    data
  })
}


export function getById(id) {
  return request({
    url: `/feature/get/${id}`,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: `/feature/delete/${id}`,
    method: 'get',
  })
}

export function exec(data) {
  return request({
    url: '/feature/exec',
    method: 'post',
    data
  })
}

export function create(data) {
    return request({
      url: '/feature/create',
      method: 'post',
      data
    })
  }
