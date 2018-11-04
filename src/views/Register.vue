<template>
    <div class="register">
      <div class="logo">
        <img src = "../../src/assets/coco@2x.png" alt = "">
      </div>
      <div class="h-118">
          <div class="left ml-78">
            <img
              class="mm-icon"
              src = "../../src/assets/icon-1.png" alt = "">
          </div>
          <div class="right">
            <!--<tool-tips-->
              <!--v-if="showTooltip.email.status"-->
              <!--:msg="showTooltip.email.msg"-->
            <!--&gt;</tool-tips>-->
            <input
              class = "test"
              placeholder = "输入邮箱"
              type = "text"
              @focus="handleFoucs"
              @blur="handleBlur"
              v-model="email">
          </div>
        </div>
      <div class = "h-118">
        <div class = "left ml-78">
          <img
            class = "mm-icon"
            src = "../../src/assets/code@2x.png" alt = "">
        </div>
        <div class = "right">
          <tool-tips v-if="showTooltip.verCode.status"></tool-tips>
          <input
            class = "test"
            placeholder = "输入验证码"
            type = "password"
            v-model="verCode">
        </div>
        <button class="btn-3"
                style="z-index: 999"
                ref="codeBtn"
                @click="handleCodeClick"
                >{{ code }}
        </button>
      </div>
      <div class = "h-118 ">
        <div class = "left ml-78">
          <img
            class = "mm-icon"
            src = "../../src/assets/pwd@2x.png" alt = "">
        </div>
        <div class = "right">
          <tool-tips
            v-if="showTooltip.password.status"
            :msg="showTooltip.password.msg"
          ></tool-tips>
          <input
            class = "test"
            placeholder = "输入密码"
            type = "password"
            @focus="handleFoucs"
            @blur="handleBlur"
            v-model="password">
        </div>
      </div>
      <div class = "h-118 ">
        <div class = "left ml-78">
          <img
            class = "mm-icon"
            src = "../../src/assets/pwd@2x.png" alt = "">
        </div>
        <div class = "right">
          <tool-tips v-if="showTooltip.cPassword.status"></tool-tips>
          <input
            class = "test"
            placeholder = "重复输入密码"
            type = "password"
            v-model="cPassword">
        </div>
      </div>
      <div class = "h-118 ">
        <div class = "left ml-78">
          <img
            class = "mm-icon"
            src = "../../src/assets/invite@2x.png" alt = "">
        </div>
        <div class = "right">
          <input
            class = "inv-code"
            type = "text"
            v-model="invCode"
            style="padding-right: 200px"
          >
          <span class="inv-code-span">(邀请码)</span>
        </div>
      </div>
      <!--<img-->
        <!--class="wh-1"-->
        <!--src = "../../src/assets/disagree@2x.png" alt = "">-->
      <span style="color:#A6BEE3;">
    </span>
      <el-checkbox
        v-model="checked"
        :size="size"
      ></el-checkbox>
      <!--<input type="checkbox" checked="checked">-->
      <router-link
      style = "color:#A6BEE3;"
      to="/">我已经仔细阅读并同意 <span style="color: #00A0E9;">《Bitcoco用户服务协议》</span></router-link>
      <button class="btn-2" @click="handleRegisterClick">注册</button>
      <section class="mt-60">
        <span style="color: #A6BEE3;">已有账号</span>
        <router-link
          style = "color: #00A0E9;"
          to="/login">直接登录
        </router-link>
      </section>
    </div>
</template>

<script>
  import ToolTips from '@/components/ToolTips'
  import qs from 'qs'
  import sha256 from 'sha256'
	export default {
		name: "Register",
    components: { ToolTips },
    data(){
		  return{
        checked: false,
        size: 'medium',
        code:'获取验证码',
        email: '',
        verCode: '',
        password: '',
        cPassword: '',
        invCode: '',
        pwKey: 'a0f5b7e615ff2ae0a18ccde5f9e8d7c8d9b790f569b7454a56daad6142384885',
        reg: {
          email: {reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/},
          verCode: {reg: /^\d{1,6}$/},
          password: {reg: /[a-zA-z0-9\x21-\x7e]{6,20}/}
        },
        showTooltip: {
          email: {
            status:  false,
            msg: ''
          },
          verCode: {
            status:  false,
            msg: ''
          },
          password: {
            status:  false,
            msg: '密码由6-20位字符组成，可包含大/小写字母'
          },
          cPassword: {
            status:  false,
            msg: ''
          },
        }
      }
    },
    methods: {
      countDown (dom, count) {
        let num = count;
        function f () {
          if (num === 0) {
            dom.removeAttribute('disabled');
            dom.innerHTML = '获取验证码';
            dom.style.background = '#00A0E9';
            return false;
          } else {
            dom.setAttribute('disabled', true);
            dom.style.background = '#72BBDD';
            dom.innerHTML = num + 'S后可重发';
            num--;
          }
          setTimeout(() => {
            f();
          }, 1000)
        }
        f();
      },
		  showMsg (msg) {
        layer.open({
          content: msg
          ,skin: 'msg'
          ,time: 3
        });
      },
      handleFoucs (event) {
        if (event.srcElement.placeholder === '输入密码') {
          this.showTooltip.password.status = true;
        }
      },
      handleBlur (event) {
        if (event.srcElement.placeholder === '输入密码') {
          this.showTooltip.password.status = false;
        }
      },
		  // 点击发送验证码
      handleCodeClick() {
        if (!this.email) {
          this.showMsg("请输入邮箱");
          return false;
        }
        if (!this.reg.email.reg.test(this.email)) {
          this.showMsg("邮箱不正确，请重新输入");
          return false;
        }
        this.countDown(this.$refs.codeBtn, 60);
        const postdata = {
          type: 'register',
          account: this.email,
          receiver: 'email'
        }
        // qs.stringify(postdata)
        this.$http.post('/api/apiv1/visitor/getValidateCode', qs.stringify(postdata))
          .then((res) => {
            if (res.data.result === "ok") {
              this.showMsg("发送成功")
              return false;
            }
            if (res.data.error.code === 5000) {
              this.showMsg("该用户已存在，请勿重新注册");
              return false;
            } else if (res.data.error.code === 1000) {
              this.showMsg("数据库错误");
              return false;
            }
        });
      },
		  // 点击注册
      // 注册接口
      handleRegisterClick () {
        if (!this.email) {
          this.showMsg("请输入邮箱");
          return false;
        }
        if (!this.reg.email.reg.test(this.email)) {
          this.showMsg("邮箱不正确，请重新输入");
          return false;
        }
        if (!this.verCode) {
          this.showMsg("请输入验证码");
          return false;
        }
        if (!this.reg.verCode.reg.test(this.verCode)) {
          this.showMsg('验证码格式不正确'); // 待改正
          return false;
        }
        if (!this.password) {
          this.showMsg("请输入密码");
          return false;
        }
        if (!this.reg.password.reg.test(this.password)) {
          this.showMsg("密码格式不正确，请重新输入");
          return false;
        }
        if (!this.cPassword) {
          this.showMsg("请输入确认密码");
          return false;
        }
        if (this.password !== this.cPassword) {
          this.showMsg("前后密码不一致");
          return false;
        }
        if (!this.checked) {
          this.showMsg("请同意用户服务协议");
          return false;
        }
        const postData = {
          email: this.email,
          password: sha256( sha256(this.password)+sha256(this.password)+this.pwKey),
          code: this.verCode,
          passwordStrength: 'medium',
          referCode: this.invCode,
        }
        this.$http.post('/api/apiv1/visitor/register', qs.stringify(postData))
          .then((res) => {
            if (res.data.result === 'ok') {
              this.$router.push('/login');
            } else if (res.data.error.code === 5007) {
              this.showMsg("您输入的验证码有误")
            } else {
              this.showMsg("注册失败");
            }
          })
      }
    }
	}
</script>

<style scoped lang="scss">
  @import "../../src/css/mixin";
  .inv-code{
    color: #ffffff;
  }
  .inv-code-span{
    position: absolute;
    font-size: 0.4rem;;
    top: 2px;
    left: 120px;
    color: #ffffff;
  }
  .register /deep/ .el-checkbox__inner{
    width: .25rem;
    height: .25rem;
  }

  /*input[type=checkbox] {*/
    /*position: relative;*/
    /*width: 10px;*/
    /*height: 1px;*/
  /*}*/
  /*input[type=checkbox]::before{*/
    /*content:'';*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 22px;*/
    /*height: 22px;*/
    /*line-height:22px;*/
    /*text-align: center;*/
    /*color:white;*/
    /*font-size:16px;*/
    /*border: 1px solid #eee;*/
    /*background-color:rgba(255, 255, 255, .3);*/
    /*border-radius: 4px;*/
  /*}*/
  /*input[type=checkbox]:checked::before {*/
    /*color:white;*/
    /*content: '';*/
  /*}*/

</style>
