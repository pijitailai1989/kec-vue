<template>
    <kec-dialog 
      boxWidth="1260px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">新增渠道</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button :disabled="true" text="储存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
              <div class="col-sm-6">
                <kec-form text="渠道编码">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="承运商">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="中文名称">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="出/入貨渠道">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="英文名稱">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="出貨渠道數字碼">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="收貨國家">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="適用目的國家">
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
                      :autosize="{ minRows: 10, maxRows: 10}"
                      placeholder="请输入内容"
                      v-model="input">
                    </el-input>
                  </template>
                </kec-form>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6">
              <div class="col-sm-12">
                <kec-form text="物流节点">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="支持的物流流程">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="可處理類目">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="支持關稅預付">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="支持退件">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="體積比率">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="多件重量計算">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="總重量計算">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="狀態獲取方式">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="預報">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="臨界重量">
                  <template #input>
                    <el-popover
                     placement="top-start"
                     width="260"
                     trigger="click">
                      <kec-weight></kec-weight>
                      <el-input :disabled="true" class="is-cursor" slot="reference" v-model="input" placeholder="" size="medium" suffix-icon="el-icon-edit"></el-input>
                    </el-popover>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="規則限制">
                  <template #input>
                    <el-popover
                     placement="top-start"
                     width="360"
                     trigger="click">
                      <kec-rule></kec-rule>
                      <el-input :disabled="true" class="is-cursor" slot="reference" v-model="input" placeholder="" size="medium" suffix-icon="el-icon-edit"></el-input>
                    </el-popover>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="面單設置">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium" suffix-icon="el-icon-edit"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="單號分配">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium" suffix-icon="el-icon-edit"></el-input>
                 </template>
                </kec-form>
              </div>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {KecButton , KecForm ,KecDialog}  from '@/common/components'
import KecWeight from './weightComponents'
import KecRule from './ruleComponents'
  export default {
    name:'channelDialog',
    props:{
      dialogVisible:Boolean
    },
    data () {
      return {
         input:'',
      };
    },

    components: {
        KecButton,
        KecForm,
        KecDialog,
        KecWeight,
        KecRule
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        cancel() {
            this.$emit('closeFunc',false)
        }
    },

    watch: {
      
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