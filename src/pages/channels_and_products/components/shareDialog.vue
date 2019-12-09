<template>
    <kec-dialog 
      boxWidth="560px"
      boxTop="20vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">共享管理</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button :disabled="true" text="储存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-xs-12 col-sm-12">
              <div class="col-sm-6">
                <kec-form text="共享">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
          </div>
          <div class="col-xs-12 col-sm-12">
              <div class="col-sm-6">
                <kec-form text="可供選擇的公司">
                  <template #input>
                    <div class="col-sm-12 borders">
                        <kec-list></kec-list>
                    </div>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="已選擇的公司">
                  <template #input>
                    <div class="col-sm-12 borders">
                        <kec-list></kec-list>
                    </div>
                  </template>
                </kec-form>
              </div>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {KecButton , KecForm ,KecDialog ,KecSwitch,KecList}  from '@/common/components'
  export default {
    name:'shareDialog',
    props:{
      dialogVisible:Boolean
    },
    data () {
      return {
         inputs:[],
         input:'',
         options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      };
    },

    components: {
        KecButton,
        KecForm,
        KecDialog,
        KecSwitch,
        KecList
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        cancel() {
            this.$emit('closeFunc',false)
        }
    },

    watch: {}

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   min-height 225px
</style>