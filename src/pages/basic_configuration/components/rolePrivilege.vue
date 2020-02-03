<template>
  <div class="row ">
    
    <kec-scroll :numbers="174" class="col-sm-12 createUser">
      
        <kec-form text="角色权限">
          <template #input>
            <div class="borders col-sm-12">
              <div class="col-sm-4 col-sm-offset-1 flexs a-center">
                <span style="margin-right:10px">角色</span>
                <el-input v-model="roleObj.name" :disabled="true" style="width:60%"></el-input>
                 
              </div>
              <div class="col-sm-6  col-sm-offset-1">
                <div class="col-sm-12">
                  <el-checkbox-group v-model="checkList" @change="changeListFunc">
                    <el-checkbox v-for="(item,index) of checkboxList" :key="index" :label="item.id">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="col-sm-12 flexs a-center">
                  <el-select v-model="id" placeholder="请选择权限">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <kec-button text="添加至权限" @click.native="changeId(id)" icon="fa-floppy-o" background="#28A745" color="#fff" style="margin-left:10px"></kec-button>
                 </div>
                 <div class="col-sm-12">
                   <kec-form text="已选择权限" style="margin-top:20px;">
                    <template #input>
                      <ul class="selectList" style="min-height:200px">
                          <li class="flexs j-between a-center"
                            v-for="(item,index) of selectArray"
                            :key="item.id"
                            >
                              <span>{{item.label}}</span>
                              <i @click="delItem(index)" class="fa fa-trash-o" aria-hidden="true"></i>
                          </li>
                      </ul>
                    </template>
                   </kec-form>
                 </div>
                 
              </div>
              <div class="col-sm-6 flexs col-sm-offset-6 j-end" style="margin-top:10px">
                  <kec-button @click.native="clickUser" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
              </div>
            </div>
          </template>
        </kec-form>
    </kec-scroll>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton ,KecScroll }  from '@/common/components'
  export default {
    name:'createUser',
    props:[''],
    data () {
      return {
         payload:{
             user:null,
             pass:null
         },
         checkboxList:[
            {
              id: '1',
              label: '读'
            }, {
              id: '2',
              label: '写'
            }, {
              id: '3',
              label: '删'
            }
         ],
         checkList:[],
         id:'',
         options: [{
          id: '1',
          label: '黄金糕'
        }, {
          id: '2',
          label: '双皮奶'
        }, {
          id: '3',
          label: '蚵仔煎'
        }, {
          id: '4',
          label: '龙须面'
        }, {
          id: '5',
          label: '北京烤鸭'
        }],
        selectArray:[]
      };
    },

    components: {
        KecForm,
        KecButton,
        KecScroll 
    },

    computed: {
      ...mapState('basic',['roleObj']),
    },

    beforeMount() {},

    mounted() {},

    methods: {
      ...mapMutations('home',['delBreadcrumbArr']),
        changeId(id){
            let bool = this.selectArray.filter(item => item.id===id )
            let obj = this.options.find(item => item.id===id )
            bool.length === 0 && this.selectArray.push(obj)
        },
        delItem(index){
            this.selectArray.splice(index,1)
        },
        clickUser(){
          
           this.delBreadcrumbArr(1)
        },
        changeListFunc(arr){
          console.log(arr,'arr')
        }
    },

    watch: {}

  }

</script>
<style lang='stylus' scoped>
.createUser  
  padding 5px
.borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding 10px
.selectList  
   padding 2px    
   border 1px solid #DCDFE6
   border-radius 4px
   cursor pointer
   li 
     &:hover 
       background #eee
     padding 5px 10px
</style>