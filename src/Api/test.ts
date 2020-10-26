import request from './request';

export function reqGet<T>() {
  return request.get<T>('url', {
    params: {}
  })
}

export function reqPost<T>() {
  return request.post<T>('url', {
    data: {}
  })
}