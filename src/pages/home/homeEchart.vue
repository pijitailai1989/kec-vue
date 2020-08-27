<template>
<div>
    <div class="content-from">
        <!-- <el-form ref="form" :model="form" label-width="80px"> -->
           
            <el-select v-model="form.client" placeholder="请选择客户" filterable clearable @change="onChangeStripe">
            <el-option :label="value.companyName" v-for="(value, key, index) in clientalls" :key="index" :value="value.customer_code"></el-option>
          </el-select>
            <!-- <el-form-item label="产品"> -->
          <el-select v-model="form.products" placeholder="请选择产品" filterable clearable>
            <el-option :label="value.name" v-for="(value, key, index) in productalls" :key="index" :value="value.code"></el-option>
          </el-select>
            <!-- </el-form-item> -->


        <!-- <el-form-item label="客户"> -->
         
            <!-- </el-form-item> -->

         <!-- <el-form-item> -->
           <el-button type="primary" @click="submitForm()">查看</el-button>
           <!-- </el-form-item> -->
       <!-- </el-form> -->
    </div>
    <kec-scroll :numbers="190">
       <kec-echart width="100%" height="100%" :serverdate="dateSumalls"></kec-echart>
    </kec-scroll>
</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import kecEchart from './components/kecEchart.vue'
 import { get,post} from "../../untils/user.js"
 import {Link} from 'element-ui'
  export default {
    name:'homeEchart',
    props:{
    },
    components:{
      kecEchart,
      Link
    },
    data () {
      return {
        form:{
             products:null,
             client:null
        },
        productallsrows:'',
        productalls:'',
        clientalls:'',
        dateSumalls:"",
      };
    },
    computed: {
      
    },
     mounted(){
      var _this = this
      get('/business/customer/queryAll?status=ENABLED').then(response => {
                if(response.code==200){
                  _this.clientalls = response.body
                }
              })

        get('/product/products/simpleList').then(response => {
                if(response.code==200){
                  _this.productallsrows = response.body
               
                }
              })

             
        get('/business/dash-board').then(response => {
                if(response.code==200){
                    var obj = response.body
             var numder = [];
             var arr = Object.keys(obj.counts).reverse()

            for(var n=0;n<arr.length;n++){
                      numder.push(obj.counts[arr[n]].all);
                }
                    _this.dateSumalls = {"time":arr,'ordersum':numder}
             
              }
          })
     
    },
    methods: {
      onChangeStripe:function(){
        this.form.products = [];
           if(this.form.client!="" && this.form.client!=null){
         get('/business/dash-board',{'customerCode':this.form.client}).then(response => {
                if(response.code==200){
                    var obj = response.body
                      this.productalls = [];

                       for(var t=0;t<obj.allProductCodes.length;t++){
                          for(var b=0;b<this.productallsrows.length;b++){
                           if(this.productallsrows[b].code==obj.allProductCodes[t]){
                               this.productalls.push({'code':this.productallsrows[b].code,'name':this.productallsrows[b].name})
                           }
                       }
                    }
                    console.log(JSON.stringify(this.productalls))
                }
            })
           }
      },
       submitForm:function(){
         let client = this.form.client
         let products = this.form.products

         if(client==null && products!=null){
          this.$message( {
                    message: '客户不能为空!',
                    type: 'error'
                   });
                   return false;
         }

           let postData = {}
           if(client){
             postData.customerCode = client
           }
           if(products){
             postData.productCode = products
           }
           get('/business/dash-board',postData).then(response => {
                if(response.code==200){
                    var obj = response.body
                    var arr = Object.keys(obj.counts).reverse()
                    
              

                  if(obj.status==1){
                   
                    this.dateSumalls = {"time":arr,'status':obj.status}
                    return false;
                  }
                 

                if(products!=null  && client!=null){
                 var numder = [];
                 for(var n=0;n<arr.length;n++){
             
                   let shift = Object.values(obj.counts[arr[n]])[0]
                    if(shift){
                      numder.push(shift)
                    }else{
                      numder.push(0)
                    }
                 } 
                
                  this.dateSumalls = {"time":arr,'ordersum':numder}
                

                //  if(products!=null && products!="" && client!=null){
                //  var numder = [];
                //  for(var n=0;n<arr.length;n++){
             
                //    let shift = Object.values(obj.counts[arr[n]])[0]
                //     if(shift){
                //       numder.push(shift)
                //     }else{
                //       numder.push(0)
                //     }
                //  } 
                
                //   this.dateSumalls = {"time":arr}
            
                }else{

                
                      var keys = [];
                 for(var n=0;n<arr.length;n++){
                   let shift = Object.keys(obj.counts[arr[n]])
                     keys = keys.concat(shift)
                 }
                 


                 var hash=[];
                for (var i = 0; i < keys.length; i++) {
                 if(hash.indexOf(keys[i])==-1){
                 hash.push(keys[i]);
                }
                 }
  
                var r = [];
                for(var w=0;w<hash.length;w++){
                    var ade = [];
                    for(var t=0;t<arr.length;t++){
                      
                      if(obj.counts[arr[t]][hash[w]]){
                        ade.push(obj.counts[arr[t]][hash[w]])
                      }else{
                        ade.push(0)
                      } 
                    }
                    r[w] = ade
                }

                 var result = r.reduce(function(total,value,index,arr){
                      var row = [];
                       for(var c=0;c<12;c++){
                         row.push(total[c]+value[c])
                      }
                      return row

                })
               
                for(var d = 0;d<hash.length;d++){
                for(var u=0;u<this.productalls.length;u++){
                   if(this.productalls[u].code==hash[d]){
                     hash[d] = this.productalls[u].name
                   }
                }
                }
                this.dateSumalls = {"time":arr,'hash':hash,'arr':r,'ordersum':result}
                }
              }
          })

       } 
      
    },
    watch:{
      
    }

  }

</script>
<style scoped>
  .content-from{
     width:100%;
     padding-top: 10px;
     padding-left:10px ;
     padding-bottom: 10px;
     background: #fff;
     /* height: 100px; */
  }
</style>