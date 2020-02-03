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
        mazarine:{
            header_background_color:'#135590',
            header_text_color:'#fff',
            menu_background_color:'#333',
            menu_text_color:'#fff',
            copy_background_color:'#000',
            copy_text_color:'#fff',
            content_background_color:'#eee',
            content_table_color:'#FAE1CB',
            content_border_color:'#135590',
            content_text_color:'#333'
        },
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
        case "http://127.0.0.1:8081":
          colors = 'mazarine' ;
          break;
        default :
          colors = 'orange' ;
          break;
    }
    return data[colors];
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

export function sortCompare(data,type){
    let arr = data ;
    arr.sort((a, b) => a[type].charCodeAt(0) - b[type].charCodeAt(0));
    return arr
}