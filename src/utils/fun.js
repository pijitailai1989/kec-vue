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
            content_table_color:'#FFEBCD',
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

export function toMoney(data){
    var str = data.toFixed(2) + ''
    var newStr = "";
    var count = 0;
    
    if(str.indexOf(".")==-1){
     for(var i=str.length-1;i>=0;i--){
      if(count % 3 == 0 && count != 0){
       newStr = str.charAt(i) + "," + newStr;
      }else{
       newStr = str.charAt(i) + newStr;
      }
      count++;
     }
     str = newStr + ".00"; 
    }
    else
    {
     for(var i = str.indexOf(".")-1;i>=0;i--){
      if(count % 3 == 0 && count != 0){
       newStr = str.charAt(i) + "," + newStr;
      }else{
       newStr = str.charAt(i) + newStr; 
      }
      count++;
     }
     str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
    }
    return str
 }

export function isNumber(val){

    var regPos = /^\d+(\.\d+)?$/; 
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }

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
            index != -1 && arr.sort((a, b)=> a[type]?a[type] - b[type]:0-0);
            index == -1 && arr.sort((a, b)=> b[type]?b[type] - a[type]:0-0);
           break;
        case 'ZH':
            index != -1 && arr.sort((a, b)=> a[type]?a[type].localeCompare(b[type], 'zh'):''.localeCompare('', 'zh'));
            index == -1 && arr.sort((a, b)=> b[type]?b[type].localeCompare(a[type], 'zh'):''.localeCompare('', 'zh'));
           break;
        default:
            index == -1 && arr.sort((a, b) => a[type]?a[type].charCodeAt(0) - b[type].charCodeAt(0):''.charCodeAt(0) - ''.charCodeAt(0));
            index != -1 && arr.sort((a, b) => b[type]?b[type].charCodeAt(0) - a[type].charCodeAt(0):''.charCodeAt(0) - ''.charCodeAt(0));
           break;
   } 
   return arr
}

export function getClientHeight()
{
  var clientHeight=0;
  if(document.body.clientHeight&&document.documentElement.clientHeight)
  {
  var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  else
  {
  var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  return clientHeight;
}