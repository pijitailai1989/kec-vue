import Vue from 'vue'

const IP_REGEX = '^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.' +
'(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' +
'(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' +
'(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$' ;

// 注册一个全局自定义指令 `v-checkParam`
const checkParam = Vue.directive('checkParam', {
    inserted: function (el, binding, vNode) {
      el.addEventListener('keyup', function (event) {
        el.className = el.className.replace('input-error', '').trim()
        // if (!event.keyCode) { 
        let isRequired = binding.value.required
        let value = el.getElementsByTagName('input')[0].value ;
        if (isRequired) {
          if (!value || value === '') {
            el.className += ' input-error'
          }
        }
          
        let regex = new RegExp( binding.value.regex ) ;
        
        if (regex === 'IpRegex') {
          if (!IP_REGEX.test(value)) {
            el.className += ' input-error'
          }
        } else if ( !regex.test(value) ) {
          el.className += ' input-error'
        }
        // }
      })
    }
  })
  
  // 注册一个全局自定义指令 `v-checkSubmit`
  const checkSubmit = Vue.directive('checkSubmit', {
    inserted: function (el, binding, vNode) {
      el.addEventListener('click', function (event) {
        let elements = document.getElementsByClassName('v-check')
        var evObj = document.createEvent('Event')
        evObj.initEvent('keyup', true, true)
        for (let element of elements) {
          element.dispatchEvent(evObj)
        }
        let errorInputs = document.getElementsByClassName('input-error');
        if(errorInputs.length === 0){
          vNode.context.submit();
        }
      })
    }
  })

export { checkParam , checkSubmit }