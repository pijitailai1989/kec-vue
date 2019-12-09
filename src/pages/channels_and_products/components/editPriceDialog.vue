<template>
    <kec-dialog 
      boxWidth="1260px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">编辑产品价格</span>
      </template>
      <template v-slot:btn>
        
      </template>
      <template>
        <div class="row">
          <div class="col-xs-12 col-sm-3">
              <div class="col-sm-12">
                <kec-form text="產品價格列表">
                  <template #input>
                    <div class="col-sm-12 borders">
                        <kec-list></kec-list>
                    </div>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12 flexs j-end a-center">
                   <kec-button icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
                   <kec-button icon="fa-clock-o" background="#ED6D01" color="#fff"></kec-button>
                   <kec-button icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
                   <kec-button icon="fa-times" background="#DC3545" color="#fff"></kec-button>
              </div>
          </div>
          <div class="col-xs-12 col-sm-9">
              <kec-tabs 
                height="509px" 
                style="margin-top:23px" 
                :titleList="['屬性','國家/區域']"
                @change="tabsFunc"
                >
                  <template>
                      <component v-bind:is="currentTabComponent" @closeFunc="cancel"></component>
                  </template>
                </kec-tabs>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {KecButton , KecForm ,KecDialog ,KecTabs,KecList}  from '@/common/components'
import KecCountry from './countryRegion'
import AttributeComponent from './attributeComponents'
  export default {
    name:'editPriceDialog',
    props:{
      dialogVisible:Boolean
    },
    data () {
      return {
         input:'',
         currentTabComponent:'AttributeComponent'
      };
    },

    components: {
        KecButton,
        KecForm,
        KecDialog,
        KecTabs,
        KecList,
        KecCountry,
        AttributeComponent
    },

    computed: {},

    beforeMount() {},

    mounted() {
      console.log(this.currentTabComponent,'currentTabComponent')
    },

    methods: {
        cancel(val) {
            this.$emit('closeFunc',val)
        },
        tabsFunc(index) {
            let arr = ['AttributeComponent','KecCountry'] ;
            this.currentTabComponent = arr[index] ;
        }
    },

    watch: {},
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