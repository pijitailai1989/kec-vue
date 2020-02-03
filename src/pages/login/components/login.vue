<template>
  <div class="content-login flexs a-center j-center">
    <div class="form-login">
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
         <el-form-item label="账号" prop="account">
           <el-input v-model="ruleForm.account"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="pass">
           <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="warning" @click="submitForm('ruleForm')">提交</el-button>
           <el-button @click="resetForm('ruleForm')" type="warning" plain>重置</el-button>
         </el-form-item>
       </el-form>
    </div>
  </div>
</template>

<script>

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
          pass: '',
          account: ''
         },
         rules: {
          pass: [
              { validator: checkPass , trigger: 'blur' }
          ],
          account: [
              { validator: checkAccount, trigger: 'blur' },
          ],
         }
      };
    },
    methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$cookies.set('keyName','dhg-345-fsdgsfg-454523')
              this.$router.push({path:'/channel-management'})
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