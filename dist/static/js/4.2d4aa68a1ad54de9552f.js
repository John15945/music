webpackJsonp([4],{E8Ug:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"Login",data:function(){return{mail:"89212912@qq.com",usernameRules:[{validate:function(t){return!!t},message:"必须填写用户名"},{validate:function(t){return t.length>=3},message:"用户名长度大于3"}],passwordRules:[{validate:function(t){return!!t},message:"必须填写密码"},{validate:function(t){return t.length>=3&&t.length<=10},message:"密码长度大于3小于10"}],argeeRules:[{validate:function(t){return!!t},message:"必须同意用户协议"}],validateForm:{username:"",password:"",isAgree:!1}}},methods:{submit:function(){this.$refs.form.validate().then(function(t){console.log("form valid: ",t)})},clear:function(){this.$refs.form.clear(),this.validateForm={username:"",password:"",isAgree:!1}},toRegister:function(){this.$router.push("/register")}},created:function(){this.mail=this.$route.query.mail}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[t._m(0),t._v(" "),t._e(),t._v(" "),s("div",{staticClass:"tc"},[s("p",{staticClass:"co-1 mt-80 fs-18"},[t._v("您的好友"+t._s(t.mail?t.mail:""))]),t._v(" "),s("p",{staticClass:"co-1 fs-34 mt-60"},[t._v("邀请您注册币可可")]),t._v(" "),s("p",{staticClass:"co-1 fs-18 btn-1 hc-1 mt-85",on:{click:t.toRegister}},[t._v("立即注册")])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mm-img-wrapper"},[e("img",{staticClass:"img",attrs:{src:s("vGtg"),alt:""}})])}]};var n=s("C7Lr")(a,i,!1,function(t){s("Xj6y")},null,null);e.default=n.exports},Xj6y:function(t,e){},vGtg:function(t,e,s){t.exports=s.p+"static/img/logo@3x.72b1c9a.png"}});
//# sourceMappingURL=4.2d4aa68a1ad54de9552f.js.map