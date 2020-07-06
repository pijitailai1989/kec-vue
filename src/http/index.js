const requireApi = require.context('.',false,/.js$/)
let module = {}
requireApi.keys().forEach((item,index) =>{
    if(item === './index.js' || item === './http.js' || item === './config.js') return ;
    Object.assign(module,requireApi(item))
})

export default module