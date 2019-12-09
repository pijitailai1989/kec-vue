<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { hostUrl } from '@/utils/fun'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  methods: {
      ...mapMutations('home',['setThemeColor']),
  },
  mounted() {
      let obj ={}
      switch(hostUrl){
        case "http://127.0.0.1:8081":
           obj = {
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
          }
          this.setThemeColor(obj) ;
          break;
        default :
           obj = {
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
          this.setThemeColor(obj) ;
          break;
      }
    }
}
</script>
