import request from '@/utils/request'

export function queryAll(data) {
  return request({
    url: '/job/queryAll',
    method: 'post',
    data
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

export function batchExec(ids) {
  return request({
    url: `/job/batchExecute?jobIds=${ids}`,
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

export function taskResult(data) {
  return request({
    url: `/task/getResult`,
    method: 'post',
    data
  })
}

export function taskCaseResult(data) {
  return request({
    url: `/task/getStepResult`,
    method: 'post',
    data
  })
}
