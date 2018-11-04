import withAxios from './http.js'
const apiConfig = [
  {
    // 发送验证码
    name: 'sendCheckCode',
    url: '/wechat/wxapp/sendCheckCode',
    method: 'post'
  }, {
    // 绑定手机号
    name: 'savePhone',
    url: '/wechat/wxapp/savePhone',
    method: 'post'
  }, {
    // 查看订单
    name: 'showMyTrade',
    url: '/wechat/wxapp/myTrade',
    method: 'post'
  },
  {
    //  查看用户信息
    name: 'showUserinfoDetail',
    url: '/wechat/wxapp/userInfoDetail',
    method: 'post'
  },
  {
    name  : 'login',
    url   : '/apiv1/visitor/H5Login',
    method: 'post'
  }
]

export default withAxios(apiConfig);
