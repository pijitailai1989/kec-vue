<template>
  <div class="row">
    <div class="col-sm-8">
      <div class="col-sm-4">
        <kec-form text="國家">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input> 
          </template>
        </kec-form>
      </div>
      <div class="col-sm-4">
        <kec-form text="幣種">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input> 
          </template>
        </kec-form>
      </div>
      <div class="col-sm-3">
        <kec-form text="臨界重量">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input> 
          </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
      <div class="col-sm-12" style="border-right:4px solid #fff">
        <kec-form text="區域">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6 border-right" >
          <div class="col-sm-12">
            <kec-form text="按件計費">
              <template #input>
                <el-input v-model="input" placeholder="" size="medium"></el-input> 
              </template>
            </kec-form>
          </div>
          <div class="col-sm-12" style="margin-top:62px">
            <kec-form text="雜費(每行一項，最多10項)">
              <template #input>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6}"
                  placeholder=""
                  v-model="input">
                </el-input>
              </template>
            </kec-form>
          </div>
      </div>
      <div class="col-sm-6 border-right">
          <div class="col-sm-12">
            <kec-form text="按箱計費">
              <template #input>
                <el-input v-model="input" placeholder="" size="medium"></el-input> 
              </template>
            </kec-form>
          </div>
          <div class="col-sm-12">
            <kec-form text="利用分攤規則">
              <template #input>
                <el-input v-model="input" placeholder="" size="medium"></el-input> 
              </template>
            </kec-form>
          </div>
          <div class="col-sm-12">
            <kec-form text="雜費(每行一項，最多10項)">
              <template #input>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6}"
                  placeholder=""
                  v-model="input">
                </el-input>
              </template>
            </kec-form>
          </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="col-sm-5">
        <kec-form text="小貨重量單位">
         <template #input>
           <el-input v-model="input" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
      <div class="col-sm-5">
        <kec-form text="大貨重量單位">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
      <div class="col-sm-5">
        <kec-form text="最小重量">
         <template #input>
           <el-input v-model="input" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
      <div class="col-sm-5">
        <kec-form text="最大重量">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
      <div class="col-sm-12">
        <kec-form text="按批次計費">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-12">
        <kec-form text="利用分攤規則">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-12">
          <kec-form text="雜費(每行一項，最多10項)">
            <template #input>
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 6}"
                placeholder=""
                v-model="input">
              </el-input>
            </template>
          </kec-form>
       </div>
    </div>
    <div class="col-sm-12 flexs kec-btn j-end">
       <kec-button :disabled="true" text="储存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
       <kec-button text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'addCountry',
    props:[''],
    data () {
      return {
        input:''
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

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
   margin-left 20px

 .border-right  
   border-right 1px solid #DCDFE6
</style>