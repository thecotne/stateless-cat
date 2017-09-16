import axios from 'axios'

const HTTP_NO_CONTENT = 204

export const baseURL = '//petstore.swagger.io/v2/'

function transformOptions (options) {
  return options
}

async function request (options) {
  const response = await axios(transformOptions(options))

  switch (response.status) {
    case HTTP_NO_CONTENT:
      return null
    default:
      return response.data
  }
}

const simpleRequest = method => async (url, params = {}, data = {}) => {
  return request({ method, url, params, data })
}

export const get = simpleRequest('get')
export const post = simpleRequest('post')
export const del = simpleRequest('delete')

export default {
  get,
  post,
  del,
  baseURL
}
