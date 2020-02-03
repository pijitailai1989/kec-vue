import qs from 'qs' 
import axios from './config'



const fetch = (options) => {
    const { methods = 'get',data,url } = options  
    switch (methods.toLowerCase()) {
        case 'get':
            let urlPath = '' 
            let paths = '' 
            if( data instanceof Array ){
               data.forEach(el=>{
                  paths += `/${el}`;
               })
               urlPath = `${url}${paths}`
            }else{
               urlPath = `${url}${data ? `?${qs.stringify(data)}` : '' }`
            }
            return axios.get(urlPath)
        case 'delete' :
            let urlPath1 = '' 
            let paths1 = '' 
            if( data instanceof Array ){
               data.forEach(el=>{
                  paths1 += `/${el}`;
               })
               urlPath1 = `${url}${paths1}`
               return axios.delete(urlPath1)
            }else if(data instanceof Object){
               console.log(11111111111111111111111,data)
               return axios.delete(url,data)
            }else{
               urlPath1 = `${url}/${data}`
               return axios.delete(urlPath1)
            }
            
        default:
            let urlPath2 = '' 
            let paths2 = '' 
            if( data instanceof Array ){
               data.forEach(el=>{
                  paths2 += `/${el}`;
               })
               urlPath2 = `${url}${paths2}`
               return axios[methods](urlPath2)
            }else{
               if(data.url && data.url instanceof Array){
                  let urlPath3 = '' 
                  let paths3 = '' 
                     data.url.forEach(el=>{
                        paths3 += `/${el}`;
                     })
                     urlPath3 = `${url}${paths3}`
                     return axios[methods](urlPath3,data.data)
               }else{
                  return axios[methods](url,data)
               }
            }
            
    }
}

export function http (options) {
    return fetch(options)
    .then((response) => {
        return response
    }).catch((error) => {
        return error
    })
}