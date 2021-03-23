// @ts-nocheck
import axios from 'axios'
let baseURL = 'http://localhost:3005/api' || ''

const instance = axios.create({
  baseURL,
})

declare module 'axios' {
  export interface AxiosRequestConfig {
    'Content-Type': string
  }
}

export default instance
