import request from './request';

// GET 请求示例
export function reqGet<T>(params: {
  page: number,
  pageSize: number
}) {
  return request.get<T>('url', {
    params
  })
}

// POST请求示例
export function reqPost<T>(data: {
  page: number,
  pageSize: number
}) {
  return request.post<T>('url', {
    data
  })
}