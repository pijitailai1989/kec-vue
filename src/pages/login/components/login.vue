<template>
  <div class="content-login flexs a-center j-center">
    <div class="form-login">
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
         <el-form-item label="账号" prop="userName">
           <el-input v-model="ruleForm.userName"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password">
           <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="warning" @click="submitForm('ruleForm',ruleForm)">提交</el-button>
           <el-button @click="resetForm('ruleForm')" type="warning" plain>重置</el-button>
         </el-form-item>
       </el-form>
    </div>
  </div>
</template>

<script>
import { mapState ,mapActions,mapMutations} from 'vuex';
  export default {
    name:'loginlogin',
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
          return callback(new Error('密码不能为空'));
        }
        setTimeout(() => {
           callback();
        }, 1000);
      };
      return {
         ruleForm: {
          userName: '',
          password: ''
         },
         rules: {
          password: [
              { validator: checkPass , trigger: 'blur' }
          ],
          userName: [
              { validator: checkAccount, trigger: 'blur' },
          ],
         }
      };
    },
    computed: {
      ...mapState('home',['userInfo'])
    },
    methods: {
      ...mapActions('home',['loadPostLogin']),
        submitForm(formName,ruleForm) {
          const _this = this ;
          
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              _this.loadPostLogin(ruleForm).then(success=>{
                   _this.userInfo.token && _this.$cookies.set('keyName',_this.userInfo.token)
                   _this.userInfo.token && _this.$router.push({path:'/home'})
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
              
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
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
     padding 60px 60px 20px 20px
     border-radius 10px    
     box-shadow 0px 0px 5px #555  
     .el-button+.el-button
        margin-left 60px

</style>