<template>
    <kec-dialog 
      boxWidth="960px"
      boxTop="20vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">新增结点</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button :disabled="true" text="储存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-xs-12 col-sm-4">
              <div class="col-sm-12">
                <kec-form text="節點代碼">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="中文名稱">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="英文名稱">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="階段">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="備註">
                  <template #input>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      placeholder="请输入内容"
                      v-model="input">
                    </el-input>
                  </template>
                </kec-form>
              </div>
          </div>
          <div class="col-xs-12 col-sm-8">
              <div class="col-sm-6">
                <kec-form text="可供選擇的狀態">
                  <template #input>
                    <div class="col-sm-12 borders pro flexs columns">
                        <span>公共可視</span>
                        <span>公共可視</span>
                        <span>公共可視</span>
                        <span>公共可視</span>
                        <span>公共可視</span>
                    </div>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="已選擇的狀態">
                  <template #input>
                    <div class="col-sm-12 borders pro flexs columns">
                        <span>公共可視</span>
                        <span>公共可視</span>
                        <span>公共可視</span>
                        <span>公共可視</span>
                        <span>公共可視</span>
                    </div>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="報警">
                  <template #input>
                    <div class="col-sm-12 borders err">
                       <div class="col-sm-3"> 
                           <kec-switch icon="fa-toggle-on fa-lg" text="可處理類目"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="多件重量計算"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="預報"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="單號分配"></kec-switch>
                       </div>
                       <div class="col-sm-3"> 
                           <kec-switch icon="fa-toggle-on fa-lg" text="支持關稅預付"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="總重量計算"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="臨界重量"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="〈未使用〉"></kec-switch>
                       </div>
                       <div class="col-sm-3"> 
                           <kec-switch icon="fa-toggle-on fa-lg" text="支持退件"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="狀態獲取方式"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="規則限制"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="〈未使用〉"></kec-switch>
                       </div>
                       <div class="col-sm-3"> 
                           <kec-switch icon="fa-toggle-on fa-lg" text="體積比率"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="重量進位規則"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="面單設置"></kec-switch>
                           <kec-switch icon="fa-toggle-on fa-lg" text="〈未使用〉"></kec-switch>
                       </div>
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
import {KecButton , KecForm ,KecDialog ,KecSwitch}  from '@/common/components'
  export default {
    name:'nodeDialog',
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
        KecSwitch
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
   &.pro  
     height 162px   
     margin-bottom 4px
     span  
       padding 3px 8px
   &.err  
     height 200px
</style>