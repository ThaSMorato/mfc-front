import axios from 'axios'

import { EnvService } from '../env/env-service'

export const api = axios.create({
  baseURL: EnvService.get('VITE_APP_API_URL'),
})

const storageFlag = EnvService.get('VITE_APP_STORAGE_FLAG')

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(storageFlag)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(storageFlag)
    }
    return Promise.reject(error)
  },
)
