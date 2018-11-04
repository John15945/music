<template>
    <div class="login">
      <div class = "logo">
        <img src = "../../src/assets/coco@2x.png" alt = "">
      </div>
      <div class = "h-118">
        <div class = "left ml-78">
          <img
            class = "mm-icon"
            src = "../../src/assets/icon-1.png" alt = "">
        </div>
        <div class = "right">
            <input
              @blur="show1=false"
              ref="ipt1"
              maxlength = "64"
              v-model = "userId"
              class = "test"
              placeholder = "输入邮箱"
              type = "text">
            <span
              v-show="show1"
              class="pos">请输入正确的邮箱地址</span>
        </div>
      </div>
      <div class = "h-118 ">
        <div class = "left ml-78">
          <img
            class = "mm-icon"
            src = "../../src/assets/pwd@2x.png" alt = "">
        </div>
        <div class = "right">
              <input
                @blur="validPwd"
                ref="ipt2"
                maxlength = "16"
                minlength="6"
                v-model = "pwd"
                class = "test"
                placeholder = "输入密码"
                type = "password">
          <span
            v-if="show2"
            class = "ipt2 pos">密码格式不正确，请重新输入</span>
        </div>
      </div>
      <div class = "h-118">
        <div class = "left ml-78">
          <img
            class = "mm-icon"
            src = "../../src/assets/code@2x.png" alt = "">
        </div>
        <div class = "right">
        <input
          ref="ipt3"
          @blur="checkCode"
          maxlength = "6"
          v-model = "mobileCode"
          class = "test"
          placeholder = "输入验证码"
          type = "text">
      >
          <button
            class = "btn-5 co-2"
            :style="{backgroundColor:css}"
            @click = "getVerificationCode">{{ called?computedTime+'s后可重发':v4 }}
          </button>
     <!--     <span
            v-if = "show3"
            class = "ipt2">输入验证码
          </span>-->
        </div>
      </div>
      <button
        @click="login"
        class = "btn-2">登录</button>
      <section class="mt-60">
      <span style = "color: #A6BEE3;">没有账号</span>
        <router-link
          style = "color: #00A0E9;"
          to="/register">直接注册</router-link>
      </section>
      
 <!--     <span class="tooltips">
        请输入验证码
      </span>-->
    </div>
</template>

<script>
  import { loginForm, validateCode,getUserInfo} from '../../src/data/init'
  import { mapState, mapMutations, mapActions } from 'vuex'

  import sha256 from 'sha256'
  export default {
		name: "Login",
    created(){
 
    },
    data(){

		  return {
		    display:{},
        userId      : '',
        pwd         : '',
        mobileCode  : '',
        v4          :'获取验证码',
        computedTime: 0,//计算时间
        called      : false,
        mobile      : 15112673769,
        s1          :false,
        s2          :false,
        s3          :false,
        show1        :false,
        show2        :false,
        show3       :false,
        css         :'',
        pwKey       :'fdec3af2f062f9d5893d22ffb46164d7ffcbee648cffb96af79121e7b274d979',
        key         :'',
        code:'',
        mail:''
		  }
    },
    watch:{
		  'postData.mobileCode':(v1,v2)=>{
      
      }
    },
    methods:{
      validId(){
          if(this.userId&&this.pattern.mobile.test(this.userId)|| this.pattern.mail.test ( this.userId )){
            this.show1=false
          }else{
            this.show1 = true
          }
      },
      validPwd(){
        if(!this.pattern.pwd.test ( this.pwd )){
          this.show2=true
          window.setTimeout(()=>{
            this.show2 = false
          },1000)
        }else{
          this.show2 = false
        }
      },
      checkCode(){
        if (!this.pattern.code.test ( this.pwd ) ) {
            this.show3=true
        }else{
          this.show3 = false
        }
      },
      checked(v){
      
      },

		  /*valid(options){
            function extend ( to,from ) {
                for(var key of from){
                    to[key]=from[key]
                }
                return to
            }
 
        var opt={
		      validCallback(){
		        
          },
          inValidCallback(){
		        
          },
          errMsg:'',
          successMsg:''
          
        }
       extend ( opt, options )
      },*/
       async  login(){
          if(this.pwd){
            this.key=sha256 ( sha256 ( this.pw ) + sha256 ( this.pw ) + this.pwKey )
          }
         if (this.checked() ) {
           
           try {
             let res = await loginForm ( this.userId, this.key, this.mobileCode )
             
                 let ret=await getUserInfo()
                   this.code=ret.data.result.referCode
                    this.mail= ret.data.result.referCode
                 this.$router.push ({
                   path:'/award',
                   query:{
                     code:this.code,
                     mail:this.mail
                   }
                 } )
           } catch ( e ) {
             console.log ( e );
           }
         }
         
      },
      getVerificationCode ( e ) {
        if (! this.pattern.mobile.test ( this.userId )&&!this.pattern.mail.test ( this.userId ) ) {
          // console.log ( this.$refs[ 'ipt1' ].select() );
          this.show1=true
          //获取手机验证码
          // getTelphoneVerifyCode ( this.user_info.mobile )
          if ( ! this.called ) {
        validateCode ( {
          'type'    : 'H5Login',
          'account' : this.userId,
          'receiver': 'email'
        } ).then ( res => {
       
        } )
            this.computedTime = 30
            this.called = true
            var timer = setInterval ( () => {
              this.computedTime --
              this.css='rgba(114,187,221,1)'
              if ( this.computedTime === 0 ) {
                clearInterval ( timer )
                this.v4 = '重新验证'
                this.called = false
              }
            }, 1000 )
          }
        }
      },//验证码
      checked() {
        if ( this.userId&&this.pattern.mobileOrEmail.test( this.userId)) {
              console.log ( 1 );
              return true
        }
        if ( this.pwd && this.pattern.pwd.test ( this.pwd)) {
              return true
        }
        if ( this.mobileCode && this.pattern.code.test ( this.mobileCode) ) {
              return true
        }
        
      },
    }
    ,
    created(){
      console.log ();
      /*    console.log ( this.valid ( {
            errMsg    : '222',
            successMsg: '111'
          } ) );*/
    },
    computed:{
		  pw(){
		    return this.pwd
      },
      ...mapState ( ['pattern'] ),
      rightPhone () {
        return this.pattern.mobile.test ( this.mobile )
      },
      validCode(){
        return this.pattern.code.test(this.mobileCode)
      }
    }
	}
</script>

<style scoped lang="scss">
  @import "../../src/css/mixin";
  .tooltips{
    display: inline-block;
    padding: 5px 10px;
    position: relative;
    background-color: rgba(255,255,255,0.9);
          &:after{
            border-bottom: 1px solid red;
            border-right: 1px solid red;
            position: absolute;
            top: 100%;
            left:50%;
            background-color: rgba(255, 255, 255, 0.9);
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform:rotate(45deg) ;
            -o-transform:rotate(45deg) ;
            transform:rotate(45deg)  ;
          }
  }
  .inactive{
  
  }
.ipt2{
  position: relative;
  left: 0;
  top: 0;
}
  .pos{
    @include borderRadius(8px);
    position: relative;
    left: 0;
    top: -100px;
    background-color: #fff;
    color: #4B4B4B;
    padding: 37px 35px;
    font-size: 24px;
  }
</style>
