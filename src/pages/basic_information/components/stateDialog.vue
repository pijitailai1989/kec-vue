<template>
    <kec-dialog 
      boxWidth="960px"
      boxTop="20vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">新增状态</span>
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
                <kec-form text="狀態編碼">
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
                <kec-form text="順序">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
          </div>
          <div class="col-xs-12 col-sm-8">
              <div class="col-sm-12">
                <kec-form text="屬性">
                  <template #input>
                    <div class="col-sm-12 borders">
                        <kec-switch icon="fa-toggle-on fa-lg" text="容許多次出現，顯示時間節點">
                            <template #values>
                               <el-select v-model="input" size="small" placeholder="请选择">
                                 <el-option
                                   v-for="item in options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                                 </el-option>
                               </el-select>
                            </template>
                        </kec-switch>
                        <kec-switch icon="fa-toggle-on fa-lg" text="客戶可視"></kec-switch>
                        <kec-switch icon="fa-toggle-on fa-lg" text="公共可視"></kec-switch>
                        <kec-switch icon="fa-toggle-on fa-lg" text="异常狀態"></kec-switch>
                        <kec-switch icon="fa-toggle-on fa-lg" text="提供額外信息">
                            <template #values>
                                <el-select
                                  style="flex:1"
                                  size="small"
                                  v-model="inputs"
                                  multiple
                                  filterable
                                  allow-create
                                  default-first-option
                                  placeholder="">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                            </template>
                        </kec-switch>
                    </div>
                  </template>
                </kec-form>
              </div>
          </div>
          <div class="col-xs-12 col-sm-12">
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
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {KecButton , KecForm ,KecDialog ,KecSwitch}  from '@/common/components'
  export default {
    name:'stateDialog',
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
   min-height 225px
</style>