<template>
  <div class="row ventorsInfo">
    
    <div class="col-sm-12">
        <kec-form text="供应商基本信息">
          <template #input>
            <div class="row borders err">
                <div class="col-sm-6">
                    <kec-form text="公司名称">
                      <template #input>
                        <el-input v-model="ventorsInfo.companyName" :disabled="true" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="VAT#">
                    <template #input>
                      <el-input v-model="ventorsInfo.vatNumber" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="联系人">
                    <template #input>
                      <el-input v-model="ventorsInfo.contactName" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="联系电话">
                    <template #input>
                      <el-input v-model="ventorsInfo.phone" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="Email">
                      <template #input>
                        <el-input v-model="ventorsInfo.email" :disabled="true" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="币种">
                    <template #input>
                      <el-input v-model="ventorsInfo.currency" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="类型">
                    <template #input>
                      <el-input v-model="ventorsInfo.type" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="网站地址">
                    <template #input>
                      <el-input v-model="ventorsInfo.webSite" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
            </div>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12" v-if="ventorsInfo.address">
        <kec-form text="地址信息">
         <template #input>
           <div class="row borders err">
              <div class="col-sm-6">
                    <kec-form text="国家">
                      <template #input>
                        <el-input v-model="ventorsInfo.address.country" :disabled="true" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="省市">
                    <template #input>
                      <el-input v-model="ventorsInfo.address.province" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="辖区">
                    <template #input>
                      <el-input v-model="ventorsInfo.address.district" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="洲">
                    <template #input>
                      <el-input v-model="ventorsInfo.address.state" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="街道">
                      <template #input>
                        <el-input v-model="ventorsInfo.address.street" :disabled="true" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="邮政编码">
                    <template #input>
                      <el-input v-model="ventorsInfo.address.postCode" :disabled="true" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form text="详细地址">
                    <template #input>
                      <el-input
                      :disabled="true"
                          size="mini"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="ventorsInfo.address.addrLine"
                        show-word-limit
                      >
                      </el-input>
                    </template>
                    </kec-form>
                </div>
            </div>
         </template>
        </kec-form>
    </div>
    
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton ,KecScroll }  from '@/common/components'
  export default {
    name:'ventorsInfos',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        
        
      }
    },

    components: {
        KecForm ,
        KecButton,
        KecScroll
    },

    computed: {
      ...mapState('basic',['ventorsInfo']),
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      
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
   margin-left 100px
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
</style>