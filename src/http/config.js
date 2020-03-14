 import axios from 'axios'
 /**
 * 配置不同环境接口前缀
 * 如果未配置默认开发配置
 * @param {*} base
 * @example
 * {
 *   dev: '开发环境配置',
 *   pro: '线上环境配置'
 * }
 */
  function conf (base = {}) {
    if (process.env.NODE_ENV === 'pro') { // 生产环境下
      let env = process.env.ENV_CONFIG || 'dev'
      return base[env] || base['dev']
    }
    // 开发环境
    
    return base['dev']
  }

  // PORTAL 接口
  const POR_LOGIN_LOGOUT = conf({
    dev: 'http://47.106.39.79:8888',
    pro: 'http://47.106.39.79:8890'
  })
  axios.defaults.baseURL = POR_LOGIN_LOGOUT
  axios.defaults.timeout = 10000
  // axios.defaults.withCredentials = true
  axios.defaults.headers['Content-Type'] = 'application/json'

  axios.defaults.responseType = 'json'
  export default axios ;
