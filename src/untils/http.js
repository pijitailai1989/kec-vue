import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router/index.js'


var loading ;

let tokenLacalStorage =  sessionStorage.getItem('token') ;
axios.defaults.headers['Authorization'] = 'Bearer ' + tokenLacalStorage;



axios.interceptors.request.use(
  config => {
    loading = Loading.service(
      { fullscreen: true,
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    return config
  },
  err => {
    setTimeout(() => {
      loading.close();
    }, 300);
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    
    setTimeout(() => {
      loading.close();
    }, 300);
    return response
  },
  error => {
    setTimeout(() => {
      loading.close();
    }, 300);
    return Promise.reject(error)
  }
)
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.responseType = 'json'
export default axios