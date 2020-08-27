<template>
  <kec-dialog 
      boxWidth="500px"
      boxTop="12vh"
      v-if="dialogVisible">
     <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click
            text="确定" 
            icon="fa-floppy-o" 
            :disabled="files==null"
            @click="clickConfirm(files)"
            background="#2D91D2" color="#fff"></kec-button-click>
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <div class="row">
          <div class="col-sm-12">
              <kec-form text="选择文件" crosswise width="70px">
                  <template #input>
                          <kec-upload bColor="#62BE35" 
                          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                          text="上传文件" multiple="" @change="changeFile($event)" />
                  </template>
             </kec-form>
             <span style="color:red;padding:10px 80px">*只支持 xlsx ，xls</span>
          </div>
        </div>
    
  </kec-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog,KecTable}  from '@/common/components'
import {formateDate} from '@/utils/fun'
  export default {
    name:'batchImport',
    props:{
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        files:null,
        
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog
    },

    computed: {
      
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('customer',['loadPostUploadCreate']),
      closeData(){
        this.files = null
      },
      changeFile(event){
        this.files = event ;
      },
      clickConfirm(files) {
        if(files){

        
        let formData = new FormData()
        formData.append('file',files)
        const _this = this ;
        _this.loadPostUploadCreate(formData).then(success=>{
            this.$emit('close',{type:this.type,bool:true})
            this.closeData()
            this.$message( {
            message: success,
            type: 'success'
            });
        }).catch(error=> {
            this.$message( {
            message: error,
            type: 'error'
            });
        })
        }
      },
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      }
    },

    watch: {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .row  
   padding 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 10px

 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding-top 4px
   &.pro  
     height 99px  
     margin-bottom 4px
   &.err  
     min-height 40px
</style>