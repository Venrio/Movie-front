import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUser'
import { message } from 'ant-design-vue';
const {token, clearToken} = useUserStore()

const router = useRouter()

const service = axios.create()

// 请求拦截
service.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = `Bearer `+ (token || localStorage.getItem('token'))
    return request
  },
  (err) => {
    Promise.reject(err)
  }
)
// 响应拦截
service.interceptors.response.use(
  (res) => {
    if (res.code === 403) {
      message.info('登录过期')
      clearToken()
      router.push('/login')
      return
    }

    return Promise.resolve(res.data)
  },
  (err) => {
    message.info(err)
    
    return Promise.reject(err)
  }
)



export default service
