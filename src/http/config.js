 import axios from 'axios'
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
    dev:  'http://47.106.39.79:8888',
    // dev:  'http://47.244.141.124:8888',
    prod: 'http://47.244.141.124:8888',
    uat:  'http://47.106.39.79:8890'
  })
  axios.defaults.baseURL = POR_LOGIN_LOGOUT
  axios.defaults.timeout = 10000
  // axios.defaults.withCredentials = true
  axios.defaults.headers['Content-Type'] = 'application/json'

  axios.defaults.responseType = 'json'
  export default axios ;
