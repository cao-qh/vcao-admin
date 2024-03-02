<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :sm="12">占位文字</a-col>
      <a-col :xs="24" :sm="12">
        <a-form class="login-form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <a-form-item>
            <a-input v-model:value="loginForm.username">
              <template #prefix>
                <SvgIcon name="user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-model:value="loginForm.password"
              type="password"
            >
              <template #prefix>
                <SvgIcon name="lock" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="loading"
              class="login-btn"
              type="primary"
              @click="login"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
const useStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 定义变量控制按钮加载效果
const loading = ref(false)
// 收集账户与密码的数据
let loginForm = reactive({ username: '', password: '' })
const login = async () => {
  loading.value = true
  // 通知仓库发登录请求
  // 请求成功->首页展示数据的地方
  // 请求失败->登录失败的提示
  try {
    // 保证登录成功
    await useStore.userLogin(loginForm)
    // 编程式导航跳转到展示数据首页
    $router.push('/')
    // 登录成功提示信息
    notification.success({
      message: loginForm.username,
      description: '登录成功',
    })
    // 登录成功加载效果消失
    loading.value = false
  } catch (error) {
    // 登录失败加载效果消失
    loading.value = false
    // 登录失败提示信息
    notification.error({
      message: loginForm.username,
      description: error.message,
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
