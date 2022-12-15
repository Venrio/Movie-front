<template>
  

  <div class="warp">
    <div class="bj"></div>
    <a-row justify="center" class="warp">
      <a-col :xs="18" :sm="14" :md="12" :lg="6" :xl="6" class="login-warp">
        <a-form
          style="width: 100%"
          :model="formState"
          name="loginRef"
          ref="loginRef"
          :layout="'vertical'"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
        >
          <a-form-item
            label="账号"
            name="username"
            :rules="[{ required: true, message: '请输入账号!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
        </a-form>

        <a-button type="primary" block @click="loginSubmit">登录</a-button>
      </a-col>
    </a-row>
  </div>


</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUser'
import { loginApi } from '@/api/login'


// 路由
const router = useRouter()
// tab交互
const activeIndex = ref(1)
const changeTab = (index) => {
  activeIndex.value = index
}

// 登录form表单
const loginRef = ref()
const formState = reactive({
  username: '',
  password: ''
})

// 登录
const loginSubmit = () => {

loginRef.value.validate().then(res => {
  // 登录校验通过
  const data = { ...formState.value }
  // 调取登陆接口，保存token,并且跳转首页
  const { setToken } = useUserStore()
  loginApi(JSON.stringify(formState)).then((res) => {
    console.log(res)
    if(res.code==200){
      setToken(res.data.id)
      router.push({
        path:'/home',
        query:{
          id:res.data.id
        }
      })
    }
    else{
      alert("登录失败！")
    }
  })
}).catch(err => {
  console.log(err)
})
}



</script>


<style scoped lang="less">
/deep/.ant-btn{
  font-size: 16px;
}
/deep/.ant-form-item-label > label {
  color: #fff;
  font-size: 16px;
}
.warp {
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 120px;
  position: relative;
  
}
.bj{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url('../../assets/bj5.jpg');
  background-color: #16161a;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
 
}
  .login-warp {
    
    .logo {
      width: 60px;
      height: 60px;
      background: url(@/assets/logo.png) no-repeat center center;
      background-size: 60px auto;
      margin: 0 auto;
    }
    .tab {
      width: 100%;
      border-radius: 8px;
      background: #f5f5f5;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4px;
      box-sizing: border-box;
      margin-top: 30px;
      .tab-btn {
        cursor: pointer;
        width: 50%;
        height: 40px;
        border-radius: 8px;
        background: transparent;
        color: #333;
        text-align: center;
        line-height: 32px;
      }
      .active-btn {
        background: #fff;
      }
    }
    .tips{
      color: red;
      font-size: 12px;
      margin: 10px 0 30px 0;
    }
    .tips-warp {
      width: 100%;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: flex-end;
    }
  }
  
</style>