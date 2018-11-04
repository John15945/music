import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.credential = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = '/api'
export const fetch = async (url, method, data) => {
  var res
  const dt=qs.stringify(data)
  switch (method) {
    case 'post':
      {
        res = await axios({
          url,
          method,
          data:dt
        });
        break;
      }
    case 'get':
      {
        res = axios.get(url, {
          params: data
        })
      }
  }
  return res
}
export const loginForm = (v1,v2,v3)=>fetch('/api/apiv1/visitor/H5Login', 'post',{
  email   :v1,
  password:v2,
  code    :v3
})
export  const  validateCode=(data)=>fetch('/api/apiv1/visitor/getValidateCode','post',data)
export  const   awardInfo=(data)=>fetch('/api/apiv1/user/reward_info','get',data)
export  const  recommendHistory=(data)=>fetch('/api/apiv1/user/get_refer_records','get',data)
export  const  awardHistory=(data)=>fetch('/api/apiv1/user/get_refer_reward_records','get',data)
export  const  getUserInfo=(data)=>fetch('/api/apiv1/user/getUserInfo','post',data)
