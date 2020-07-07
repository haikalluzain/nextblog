import Axios from 'axios'

export const APi = Axios.create({
  baseURL: `/api`,
})

APi.interceptors.response.use(
  succes => succes,
  err => {
    if (err.response && err.response.data) {
      throw { ...err.response.data, code: err.response.status }
    }
    throw err
  }
)

export const Api = () => {
  return APi
}

export const useApi = () => {
  const api = Api()
  return { api }
}
