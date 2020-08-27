 import axios from 'axios'
 import {Loading} from 'element-ui'
 /**
 * 配置不同环境接口前缀
 * 如果未配置默认开发配置
 * @param {*} base
 * @example
 * {
 *   dev: '开发环境配置',
 *   prod: '线上环境配置'
 * }
 */
  function conf (base = {}) {
    if (process.env.NODE_ENV === 'prod') { // 生产环境下
      let env = process.env.ENV_CONFIG || 'dev'
      return base[env] || base['dev']
    }else if(process.env.NODE_ENV === 'uat'){
      let env = process.env.ENV_CONFIG || 'dev'
      return base[env] || base['dev']
    }
    // 开发环境
    
    return base['dev']
  }

  // PORTAL 接口
  const POR_LOGIN_LOGOUT = conf({
    // dev:  'http://192.168.2.206:8888',
    dev:  'https://kengine.kec-app.com:8443',
    prod: 'https://kengine.kec-app.com:8443',
    uat:  'http://47.106.39.79:8890'
  })
  axios.defaults.baseURL = POR_LOGIN_LOGOUT
  axios.defaults.timeout = 10000
  // axios.defaults.withCredentials = true
  
  
  var loading ;

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
  export default axios ;
