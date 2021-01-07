// @ts-nocheck
import axios from 'axios'
let baseURL = process.env.NEXT_PUBLIC_MONO_API_HOST_NAME || ''

const instance = axios.create({
  baseURL,
})

instance.interceptors.request.use(
  function (config) {
    const secret_key = process.env.NEXT_PUBLIC_TEST_SECRET_KEY
    if (secret_key) {
      config.headers['mono-sec-key'] = secret_key
    }
    return config
  },
  function (error) {
    console.log(error)
  }
)

declare module 'axios' {
  export interface AxiosRequestConfig {
    'Content-Type': string
  }
}

export default instance
