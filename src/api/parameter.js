import request from '@/utils/request'

export function queryAll(data) {
  return request({
    url: '/parameter/queryall',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: `/parameter/query`,
    method: 'get',
    params
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

export function deleteById(params) {
  return request({
    url: '/parameter/delete',
    method: 'post',
    params
  })
}
