<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="col-sm-6">
        <kec-form text="联系人">
         <template #input>
           <el-input v-model="payload.name" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="公司">
          <template #input>
            <el-input v-model="payload.company" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="电话">
          <template #input>
            <el-input v-model="payload.phone" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="城市">
          <template #input>
            <div class="flexs">
              <el-input v-model="payload.city" placeholder="" size="medium" class="flx"></el-input>
              
            </div>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="地址">
         <template #input>
           <div class="flexs">
              <el-input v-model="payload.address" placeholder="" size="medium" class="flx"></el-input>
             
           </div>
         </template>
        </kec-form>
      </div>
      
      <div class="col-sm-6">
        <kec-form text="邮编">
         <template #input>
           <el-input v-model="payload.post_code" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="邮编">
         <template #input>
           <el-input v-model="payload.email" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="国家">
          <template #input>
            <div class="flexs">
              <el-input v-model="payload.countryCode" placeholder="" size="medium" class="flx"></el-input>
              
            </div>
          </template>
        </kec-form>
      </div>
      
    </div>
  </div>
</template>

<script>
import {KecForm, KecButton }  from '@/common/components'
import { mapState ,mapActions,mapMutations} from 'vuex';
  export default {
    name:'addresser',
    props:{
      
    },
    data () {
      return {
        payload:{
          address: null,
          city: null,
          company: null,
          countryCode: null,
          district: null,
          email: null,
          id: null,
          id_number: null,
          name:null,
          phone: null,
          post_code: null,
          province: null,
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('order',['orderInfos'])
    },
    beforeMount() {},

    mounted() {
      
    },

    methods: {
      ...mapMutations('basic',['setDestination']),
      ...mapActions('basic',['loadQueryByCountryCode']),
      
      
    },

    watch: {
      orderInfos:{
        deep:true,
        handler:function(val){
          let {sender} = val ;
          this.payload = sender
          // this.payload = JSON.parse( JSON.stringify(sender) )
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .row  
   padding 20px 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 100px
 .flx  
    flex 1
</style>