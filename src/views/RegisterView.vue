<script setup lang="ts">
import { ref } from 'vue'
import { type ElForm, ElMessage } from 'element-plus'
import { RegisterAPI } from '@/apis/user'
import { useRouter } from 'vue-router'

const router = useRouter()
//表单数据对象
const form = ref({
  userName: '',
  userPassword: '',
  confirmPassword: ''
})
//表单引用对象
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

//自定义校验规则
const validateCode = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码！'))
  } else if (value !== form.value.userPassword) {
    callback(new Error('密码不一致！'))
  } else {
    callback()
  }
}

//表单校验规则
const rules = {
  userName: [
    { required: true, message: '用户名不能为空！', trigger: 'blur' },
    { min: 4, message: '用户名长度不能小于4位！' }
  ],
  userPassword: [
    { required: true, message: '密码不能为空！', trigger: 'blur' },
    { min: 8, message: '密码长度不能小于8位！' }
  ],
  confirmPassword: [
    { validator: validateCode, trigger: 'blur' }
  ]
}

const register = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const res = await RegisterAPI(form.value)
      if (res.code === 200) {
        ElMessage.success('注册成功')
        await router.push('/login')
      } else {
        ElMessage.error(res.message)
      }
    }
  })
}

//回车触发注册
document.onkeydown = (e: any) => {
  if (e.key === 'Enter') {
    register()
  }
}
</script>

<template>
  <div class="page-container">
    <div style="flex: 1;">
      <img src="../assets/images/register.png" width="100%" alt="">
    </div>
    <div style="flex: 1;">
      <div class="title-style">
        欢迎注册
      </div>
      <div class="form-style">
        <el-form :model="form" ref="formRef" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名" prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input v-model="form.userPassword" placeholder="请输入密码" prefix-icon="Lock" show-password></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="form.confirmPassword" placeholder="请确认密码" prefix-icon="Check"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button-style" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center;">已经有账号？请
        <span style="color:#5d9ad9; cursor: pointer"
              @click="$router.push('/login')">登录</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.form-style {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-style {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px
}

.button-style {
  width: 300px;
  background-color: #5d9ad9;
  color: white;
}
</style>