<template>
    <div class="login">
      <div class="mm-img-wrapper">
       <img
         class="img"
         src = "@/assets/logo@3x.png" alt = "">
      </div>
      <mu-container v-if="false">
        <mu-form ref = "form"
                 label-width="80"
                 inline
                 label-float="true"
                 label-position="left"
                 :model = "validateForm"
                 class = "mu-demo-form">
          <mu-form-item
            label = "用户名" help-text = "帮助文字" prop = "username" :rules = "usernameRules">
            <mu-text-field v-model = "validateForm.username" prop = "username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label = "密码" prop = "password" :rules = "passwordRules">
            <mu-text-field type = "password" v-model = "validateForm.password" prop = "password"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop = "isAgree" :rules = "argeeRules">
            <mu-checkbox label = "我已经仔细阅读并同意" v-model = "validateForm.isAgree"></mu-checkbox>
          </mu-form-item>
          <mu-form-item>
            <mu-button color = "primary" @click = "submit">提交</mu-button>
            <mu-button @click = "clear">重置</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
      <div class="tc">
        <p class = "co-1 mt-80 fs-18">您的好友{{mail?mail:''}}</p>
        <p class = "co-1 fs-34 mt-60">邀请您注册币可可</p>
        <p
          @click="toRegister"
          class = "co-1 fs-18 btn-1 hc-1 mt-85">立即注册</p>
      </div>
     
    </div>
</template>

<script>
	export default {
		name: "Login",
    data () {
      return {
        mail:"89212912@qq.com",
        usernameRules: [
          { validate: ( val ) => ! ! val, message: '必须填写用户名' },
          { validate: ( val ) => val.length >= 3, message: '用户名长度大于3' }
        ],
        passwordRules: [
          { validate: ( val ) => ! ! val, message: '必须填写密码' },
          { validate: ( val ) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
        ],
        argeeRules   : [ { validate: ( val ) => ! ! val, message: '必须同意用户协议' } ],
        validateForm : {
          username: '',
          password: '',
          isAgree : false
        }
      }
    },
    methods: {
      submit () {
        this.$refs.form.validate ().then ( ( result ) => {
          console.log ( 'form valid: ', result )
        } );
      },
      clear () {
        this.$refs.form.clear ();
        this.validateForm = {
          username: '',
          password: '',
          isAgree : false
        };
      },
      toRegister(){
       this.$router.push('/register')
      }
    },
  created(){
		  this.mail=this.$route.query.mail
    }
	}
</script>
<style  lang="scss">
  @import "../../src/css/mixin";
  .login{
      background: linear-gradient(180deg, rgba(16, 44, 108, 1) 0%, rgba(9, 72, 162, 1) 100%);
      height: inherit;
    .mm-img-wrapper {
      width: 520px;
      height: 520px;
      background-color: #fff;
      @include flex();
      @include borderRadius(50%);
      margin: 0px auto;
      .img {
        width: 354px;
        display: block;
        height: auto;
        max-width: 100%;
      }
    }
  }


</style>
