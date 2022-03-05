import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const axiosAuth = axios.create({
//   baseURL: 'http://localhost:8000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@shm:token');
    const newConfig = config;
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config
//     const refresh = localStorage.getItem('@shm:refresh')

//     const { response } = error

//     if (response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       return axiosAuth
//         .post('/api/token/refresh/', { refresh })
//         .then((res) => {
//           if (res.status === 200) {
//             localStorage.setItem('@shm:token', res.data.access)
//             console.log('REFRESHED TOKEN')
//             return api(originalRequest)
//           }
//           return Promise.resolve(res)
//         })
//         .catch((err) => {
//           localStorage.removeItem('@shm:token')
//           localStorage.removeItem('@shm:refresh')
//           localStorage.removeItem('@shm:user')
//           window.location = '/'
//           return Promise.reject(err)
//         })
//     }

//     return Promise.reject(error)
//   }
// )

export default api;
