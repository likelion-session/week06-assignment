import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Server connection failed or CORS/network error')
    } else {
      console.error('HTTP', error.response.status, error.response.data)
    }
    return Promise.reject(error)
  },
)

export default api
