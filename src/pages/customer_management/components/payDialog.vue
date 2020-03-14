<template>
    <kec-dialog 
      boxWidth="300px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">充值</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="clickConfirm" text="确定" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
           
            <div class="col-sm-12">
                <kec-form text="金额" crosswise width="40px">
                <template #input>
                  <el-input v-model="investAmount" placeholder="" size="medium"></el-input>
                </template>
                </kec-form>
            </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecList}  from '@/common/components'
  export default {
    name:'payDialog',
    props:{
      dialogVisible:Boolean
    },
    data () {
      return {
         investAmount:null
      };
    },

    components: {
        KecButton,
        KecForm,
        KecDialog,
        KecTabs,
        KecList,
    },

    computed: {
      ...mapState('basic',['ventorsId']),
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('customer',['loadPutInvestAccount']),
        cancel(val) {
            this.$emit('closeFunc',false)
        },
        clickConfirm() {
                const _this = this ;
                let data = {
                  id:_this.ventorsId,
                  investAmount:parseFloat(_this.investAmount)
                }
                _this.loadPutInvestAccount(data).then(success=>{
                   _this.$emit('closeFunc',true)
                   _this.investAmount = null
                   _this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                   _this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
        }
    },

    watch: {
      
    },
    destroyed() {
      this.currentTabComponent = ''
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   height 469px
 .j-end 
   height 40px
</style>