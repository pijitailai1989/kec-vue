<template>
    <kec-dialog 
      boxWidth="560px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-6">
              <el-upload
                class="upload-demo"
                :action="actionSingle"
                :on-success="handleSuccess"
                :disabled="disableds"
                :on-error="handleError"
                :on-progress="handleProgress"
                :file-list="fileList">
                <el-button size="small" type="success">文件上传 (单行)</el-button>
                <div slot="tip" class="el-upload__tip" style="color:red;">* Excel文件格式为单个订单单个物品</div>
              </el-upload>
          </div>
          <div class="col-sm-6">
              <el-upload
                class="upload-demo"
                :action="actionMultiple"
                :disabled="disableds"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                :on-error="handleError"
                :file-list="fileList1">
                <el-button size="small" type="success">文件上传 (多行)</el-button>
                <div slot="tip" class="el-upload__tip" style="color:red;">* Excel文件格式为单个订单多个物品</div>
              </el-upload>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecButtonClick}  from '@/common/components'
import axios from '@/http/config'
  export default {
    name:'importEexDialog',
    props:{
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        loading:false,
        fileList: [],
        fileList1: [],
        actionSingle:'',
        actionMultiple:'',
        disableds:false
      };
    },

    components: {
        KecButton,
        KecButtonClick,
        KecForm,
        KecDialog,
        KecTabs,
    },

    computed: {
    },

    beforeMount() {},

    mounted() {
      let url = axios.defaults.baseURL ;
      this.actionSingle = url + '/file/order/upload/simpleOrder';
      this.actionMultiple = url + '/file/order/upload/multiOrder'
    },

    methods: {
        cancel() {
            this.$emit('closeFunc',false)
        },
        handleSuccess(response, file) {
          this.disableds = false ;
            let {code,message} = response ;
            if(code === 200) {
              this.$message( {
                    message: message,
                    type: 'success'
                   });
              this.$emit('closeFunc',true)
            }else{
              this.$message( {
                    message: message,
                    type: 'error'
                   });
            }
        },
        handleError(error){
          this.disableds = false ;
          let {code,message} = error ;
          this.$message( {
                    message: message,
                    type: 'error'
                   });
        },
        handleProgress(){
          this.disableds = true ;
        }
        
    },

    watch: {
      
      
    },
    destroyed() {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .row >>> .is-cursor
   .el-input__inner
     cursor pointer !important

</style>