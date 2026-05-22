import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      console.error('서버 연결 실패 또는 CORS/네트워크 오류');
    } else {
      console.error('HTTP', err.response.status, err.response.data);
    }

    return Promise.reject(err);
  }
);

export default api;
