import request from '@/utils/request'

export function queryAll() {
  return request({
    url: '/job/queryAll',
    method: 'post'
  })
}


export function create(data) {
  return request({
    url: '/job/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/job/update',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/job/delete?jobId=${id}`,
    method: 'get',
  })
}

export function updateStatus(data) {
  return request({
    url: `/job/updateStatus`,
    method: 'post',
    data
  })
}

export function exec(id) {
  return request({
    url: `/job/execute?jobId=${id}`,
    method: 'get',
  })
}

export function getTask(data) {
  return request({
    url: `/task/getTask`,
    method: 'post',
    data
  })
}

export function taskResult(id) {
  return request({
    url: `/task/getResult?taskId=${id}`,
    method: 'get',
  })
}
