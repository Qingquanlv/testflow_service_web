import request from '@/utils/request'

export function exec(data) {
  return request({
    url: '/case/exec',
    method: 'post',
    data
  })
}

