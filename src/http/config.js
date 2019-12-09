 import axios from 'axios'
 /**
 * 配置不同环境接口前缀
 * 如果未配置dev为默认配置
 * @param {*} base
 * @example
 * {
 *   dev: 'dev环境配置信息',
 *   test: 'test环境配置信息',
 *   prod: '线上环境配置信息'
 * }
 */
  function conf (base = {}) {
    if (process.env.NODE_ENV === 'production') { // 生产环境下
      let env = process.env.ENV_CONFIG || 'dev'
      return base[env] || base['dev']
    }
    // 开发环境
    return base['dev']
  }
  
  // PORTAL 接口
  const POR_LOGIN_LOGOUT = conf({
    dev: 'http://47.106.39.79:8888',
    // dev: 'http://192.168.2.81:8888',
    test: 'http://192.168.2.81:8080',
    prod: 'http://192.168.2.81:8080'
  })

  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  axios.defaults.baseURL = POR_LOGIN_LOGOUT
  axios.defaults.timeout = 10000
  // axios.defaults.withCredentials = true
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.defaults.responseType = 'json'

  export default axios ;