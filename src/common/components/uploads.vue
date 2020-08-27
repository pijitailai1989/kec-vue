<template>
  <div class="flexs rown">
    <div class="flexs rown files">
      <span class="fileText" :style="{backgroundColor:bColor?bColor:'#62BE35'}">{{text?text:'上传文件'}}</span>
      <input v-if="multiple=='multiple'" type="file" class="fileInput" multiple="multiple" ref="inputer" @change="fileUpload" :accept="accept" />
      <input v-else type="file" class="fileInput" ref="inputer" @change="fileUpload" :accept="accept" />
    </div>
    <div class="fileName">{{fileName}}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name:'KecUpload',
    props:{
        bColor:String,
        text:String,
        accept:{
          type:String,
          default:''
        },
        multiple:{
          type:String,
          default:''
        }
    },
    data () {
      return {
        fileName:''
      };
    },

    components: {},

    computed: {
        ...mapState('home',['tabsShow']),
        
    },

    beforeMount() {},

    mounted() {
      
    },

    methods: {
      fileUpload(event){
        const _ = this ;
        let files = event.target.files
        if(_.multiple == 'multiple'){
          _.fileName = '已选择多个文件'
          _.$emit('change',files)
        }else{
          _.fileName = files[0].name
          _.$emit('change',files[0])
        }
      }
    },

    watch: {}

  }

</script>
<style lang='stylus' scoped>
.files 
  width 100px 
  box-shadow 1px 1px 2px #ccc  
  border-radius 3px  
  position relative
  input
    cursor pointer
  .fileText 
    width 100%
    text-align center
    line-height 34px
    height 36px
    color #fff
    border-radius 3px
    cursor pointer
  .fileInput 
    width 100%
    height 36px
    position absolute
    opacity 0
    cursor pointer
.fileName 
  height 36px
  flex 1  
  line-height 34px
  padding-left 2px
</style>