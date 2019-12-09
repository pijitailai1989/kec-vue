<template>
    <div>
      <div class="searchInput">
          <div class="itemCenter">
            <el-input placeholder="请输入订单号" v-model="input">
              <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
      </div>
      <div class="itemCenter">
         <el-timeline>
           <el-timeline-item 
             :timestamp="item.bid"
             placement="top"
             v-for="(item,i) in listArr"
             :key="item.bid"
             size="large"
             :icon="item.active?'el-icon-arrow-down':'el-icon-arrow-right'"
             color="#f20d0d"
             @click.native="clickIcon(i,item.active)"
            >
             <el-card v-show="item.active">
               <p class="itemPadding"
                v-for="(todo,index) in item.tag"
                :key="index">{{index+1}}.{{todo}}
               </p>
             </el-card>
           </el-timeline-item>
         </el-timeline>
      </div>
      
    </div>

</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  name: 'home',
  data (){
      return{
         input:''
      }
  },
  computed:{
    ...mapState('home',['listArr']),
  },
  methods:{
    ...mapActions('home', ['axiosNovelApi']),
    ...mapMutations('home',['setListArr','setItemActive']),
    clickIcon(i,active){
        let data = {
          index:i,
          active
        }
        this.setItemActive(data)
    }
  },
  mounted(){
    this.axiosNovelApi()
  }
}
</script>

<style lang="" scoped>
 .searchInput{
   width:100%;
   padding:50px 0;
 }
 .itemCenter{
   width:80%;
   max-width: 960px;
   margin: 0 auto;
 }
 .itemPadding{
     padding:5px 0;
 }
</style>