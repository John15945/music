import axios from 'axios'
import qs from 'qs'

const withAxios = apiConfig => {
  const serviceMap = {};
  apiConfig.map(({name, url, method}) => {
    serviceMap[name] = async function (data = {}) {
      let key = 'params';
      if (method === 'post' || method === 'put') {
        key = 'data';
      }
      return axios({
        method,
        url: url,
        [key]: qs.stringify(data),
      })
    }
  })
  return serviceMap;
}

export default withAxios;
