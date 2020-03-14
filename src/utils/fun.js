export const  hostUrl = function(){
    var port = location.port;
    var hostUrl = "http://";
     
    if(port == 80){
        hostUrl += location.hostname;
    }else{
        hostUrl += location.host;
    }
     
    return hostUrl;
}()

export function themeColor(url){
    let colors = '';
    let data = {
        orange:{
            header_background_color:'#ED6D01',
            header_text_color:'#fff',
            menu_background_color:'#333',
            menu_text_color:'#fff',
            copy_background_color:'#000',
            copy_text_color:'#fff',
            content_background_color:'#eee',
            content_table_color:'#FAE1CB',
            content_border_color:'#ED6D01',
            content_text_color:'#333'
        }

        
    }
    switch(url){
        default :
          colors = 'orange' ;
          break;
    }
    return data[colors];
}

export function formateDate(date) {
    var date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    m = m > 9 ? m : '0' + m;
    return y + '-' + m + '-' + d ;
}


export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function mGetDate(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
}
let sortArr = []
export function sortCompare(data,type,fn){
    let arr = data ;
    let index = sortArr.indexOf(type) ;
    if(index == -1){
    sortArr.push(type)
    }else{
    sortArr.splice(index,1)
    }
    switch(fn) {
        case '1-9':
            index != -1 && data.sort((a, b)=> a[type] - b[type]);
            index == -1 && data.sort((a, b)=> b[type] - a[type]);
           break;
        case 'ZH':
            index != -1 && data.sort((a, b)=> a[type].localeCompare(b[type], 'zh'));
            index == -1 && data.sort((a, b)=> b[type].localeCompare(a[type], 'zh'));
           break;
        default:
            index == -1 && arr.sort((a, b) => a[type].charCodeAt(0) - b[type].charCodeAt(0));
            index != -1 && arr.sort((a, b) => b[type].charCodeAt(0) - a[type].charCodeAt(0));
           break;
   } 
   return arr
}