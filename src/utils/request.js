import axios from 'axios'

const instance = axios.create({
  timeout: 20000
})

instance.defaults.baseURL = '/api'
instance.defaults.headers.post['Content-Type'] = 'application/json'

function request(params) {
  return instance(params)
}

export {
  request
}