<template>
  <div class="login-container">
    <div class="main">
      <a-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
      >
        <h1>启航云仓</h1>
        <h2>管理员账户</h2>
        <a-form-item name="username">
          <a-input v-model:value="loginForm.username">
            <template #prefix>
              <UserOutlined style="color: gray" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password v-model:value="loginForm.password" type="password">
            <template #prefix>
              <LockOutlined style="color: gray" />
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
    </div>
    <div class="footer">
      <p>© All Rights Reserved</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { notification } from 'ant-design-vue'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'

const useStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 获取路由对象
const $route = useRoute()
// 定义变量控制按钮加载效果
const loading = ref(false)
// 收集账户与密码的数据
const loginForm = reactive({ username: '', password: '' })
// 表单验证
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'change',
    },
    {
      min: 5,
      max: 15,
      message: '用户名长度为5-15位',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'change',
    },
    {
      min: 5,
      max: 15,
      message: '密码长度为5-15位',
      trigger: 'change',
    },
  ],
}
// 表单引用
const formRef = ref()
const login = async () => {
  try {
    await formRef.value.validate()
    loading.value = true
    // 通知仓库发登录请求
    // 请求成功->首页展示数据的地方
    // 请求失败->登录失败的提示
    try {
      // 保证登录成功
      await useStore.userLogin(loginForm)
      const redirect = $route.query.redirect
      // 编程式导航跳转到展示数据首页
      $router.push({ path: redirect ? String(redirect) : '/' })
      // 登录成功提示信息
      notification.success({
        message: '欢迎回来',
        description: `HI，${getTime()}好`,
      })
      // 登录成功加载效果消失
      loading.value = false
    } catch (error: any) {
      // 登录失败加载效果消失
      loading.value = false
      // 登录失败提示信息
      notification.error({
        message: loginForm.username,
        description: error.message,
      })
    }
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;
  padding: 10% 0;

  .main {
    width: 375px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;

    .login-form {
      h1 {
        font-size: 25px;
        padding: 10px 0;
        text-align: center;
      }
      h2 {
        font-size: 15px;
        padding: 0 0 10px 0;
        text-align: center;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 30px;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
  }
}
</style>
