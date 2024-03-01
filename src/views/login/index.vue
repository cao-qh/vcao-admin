<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :sm="12">占位文字</a-col>
      <a-col :xs="24" :sm="12">
        <a-form class="login-form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <a-form-item>
            <a-input v-model="loginForm.username">
              <template #prefix><SvgIcon name="user" /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password v-model="loginForm.password" type="password">
              <template #prefix><SvgIcon name="lock" /></template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button class="login-btn" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// 收集账户与密码的数据
let loginForm = reactive({ username: '', password: '' })
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
