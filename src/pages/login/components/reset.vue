<template>
  <div class="content-login flexs a-center j-center">
    <div class="form-login">
       <div class="flexs font j-center">
          <span>{{text}}</span>
       </div>
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
         <el-form-item label="用户账号" prop="userName" v-if="hashs ==='#email'">
           <el-input v-model="ruleForm.userName"></el-input>
         </el-form-item>
         <el-form-item label="新密码" prop="password" v-else>
           <el-input  type="password" v-model="ruleForm.password"></el-input>
         </el-form-item>
         <el-form-item label="注册邮箱" prop="email" v-if="hashs ==='#email'">
           <el-input v-model="ruleForm.email"></el-input>
         </el-form-item>
         
         <el-form-item label="确认密码" prop="passwords" v-else>
           <el-input  type="password" v-model="ruleForm.passwords"></el-input>
         </el-form-item>
         <el-form-item>
           <div class="flexs j-between">
               <el-button type="warning" @click="submitForm('ruleForm',ruleForm)">提交</el-button>
               <el-link :underline="false" type="primary" href="#/login">返回登录</el-link>
           </div>
          
         </el-form-item>
       </el-form>
    </div>
  </div>
</template>

<script>
import {Form,FormItem,Link} from 'element-ui'
import { mapState ,mapActions,mapMutations} from 'vuex';
  export default {
    name:'reset',
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
           callback();
        }, 1000);
      };
      var checkPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('新密码不能为空'));
        }
        setTimeout(() => {
           callback();
        }, 1000);
      };
      var checkPasss = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('确认密码不能为空'));
        }else if (value !== this.ruleForm.password) {
          return callback(new Error('两次输入密码不一致!'));
        }
        setTimeout(() => {
           callback();
        }, 1000);
      };
      var checkEamil = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
           callback();
        }, 1000);
      };
      return {
         ruleForm: {
          userName: '',
          password: '',
          passwords: '',
          email:''
         },
         rules: {
          password: [
              { validator: checkPass , trigger: 'blur' }
          ],
          passwords: [
              { validator: checkPasss , trigger: 'blur' }
          ],
          userName: [
              { validator: checkAccount, trigger: 'blur' },
          ],
          email: [
              { validator: checkEamil, trigger: 'blur' },
          ],
         },
         text:'',
         hashs:'',
         querys:null
      };
    },
    computed: {
      ...mapState('home',['userInfo'])
    },
    components: {
        'el-form':Form ,
        'el-form-item':FormItem,
        'el-link':Link
    },
    mounted(){
      sessionStorage.clear()
      localStorage.clear()
      let{hash,query} = this.$route ;
      this.getFun(hash,query)
    },
    methods: {
      ...mapActions('home',['loadPostResetPassword','loadPutResetPassword']),
        submitForm(formName,ruleForm) {
          const _this = this ;
          let {passwords,password,userName,email} = ruleForm ;
          let data ={}
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              if(_this.hashs==='#email'){
                data = {userName,emailAddress:email}
                _this.loadPostResetPassword(data).then(success=>{
                  _this.ruleForm = {
                    userName: '',
                    password: '',
                    passwords: '',
                    email:''
                  }
                   _this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                   _this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
              }else{
                let{userName,token} = this.querys ; 
                data = {userName,token,password}
                _this.loadPutResetPassword(data).then(success=>{
                  _this.ruleForm = {
                    userName: '',
                    password: '',
                    passwords: '',
                    email:''
                  }
                   _this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                   _this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
              }
              
              
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        getFun(hash,query){
          this.hashs = hash ;
          this.querys = query;
         if(hash==='#email'){
          this.text = '忘记密码'
         }else{
          this.text = '修改密码'
         }
        }
        
    },
    watch:{
      $route: {
        handler: function(val, oldVal){
          let {hash,query} = val ;
          this.getFun(hash,query)
        },
        deep: true
      }
    }
  }

</script>
<style lang='stylus' scoped>
 .content-login 
   height 100%;
   width 100%;
   .form-login 
     width 365px
     background rgba(255,255,255,.9)
     padding 20px 60px 20px 20px
     border-radius 10px    
     box-shadow 0px 0px 5px #555  
     .el-button+.el-button
        margin-left 60px
 .font 
   font-size 20px
   padding 10px 0 20px 0
   span  
     margin-left 40px
</style>