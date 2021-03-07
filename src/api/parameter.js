import request from '@/utils/request'

export function queryAll() {
  return request({
    url: '/parameter/queryall',
    method: 'post'
  })
}


export function create(data) {
  return request({
    url: '/parameter/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/parameter/update',
    method: 'post',
    data
  })
}

export function deleteByName(params) {
  return request({
    url: '/parameter/delete',
    method: 'post',
    params
  })
}
