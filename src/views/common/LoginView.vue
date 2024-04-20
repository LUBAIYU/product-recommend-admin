<script setup lang="ts">
import { ref } from 'vue'
import ValidCode from '../../components/ValidCode.vue'
import { LoginAPI } from '@/apis/user'
import { ElForm, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { setCurrentUser } from '@/states/userState'

const router = useRouter()
//表单数据
const form = ref({
  userName: '',
  userPassword: '',
  code: ''         //用户输入的验证码
})
//验证码组件生成的验证码
const code = ref('')
const loginRef = ref<InstanceType<typeof ElForm> | null>(null)

//自定义验证码校验
const validateCode = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码！'))
  } else if (value.toLowerCase() !== code.value.toLowerCase()) {
    callback(new Error('验证码错误！'))
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
  code: [
    { validator: validateCode, trigger: 'blur' }
  ]
}
//登录
const login = () => {
  loginRef.value?.validate(async (valid: any) => {
    if (valid) {
      const res = await LoginAPI(form.value)
      if (res.code === 200) {
        ElMessage.success('登录成功')
        setCurrentUser(res.data)
        await router.push('/admin')
      } else {
        ElMessage.error(res.message)
      }
    }
  })
}

//获取验证码
const getCode = (genCode: string) => {
  code.value = genCode
}

//回车触发登录
document.onkeydown = (e: any) => {
  if (e.key === 'Enter') {
    login()
  }
}
</script>

<template>
  <div class="page-container">
    <div style="flex: 1;">
      <img src="../../assets/images/login.png" width="100%" alt="">
    </div>
    <div style="flex: 1">
      <div class="title-style">
        欢迎登录商品推荐系统
      </div>
      <div class="form-style">
        <el-form :model="form" :rules="rules" ref="loginRef">
          <el-form-item prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名" prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input v-model="form.userPassword" placeholder="请输入密码" prefix-icon="Lock" show-password></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex; width: 300px">
              <el-input style="flex: 1; width: 150px" v-model="form.code" placeholder="请输入验证码"
                        prefix-icon="Check"></el-input>
              <div style="flex: 1;height: 36px">
                <valid-code @update:value="getCode"></valid-code>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="button-style" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center">还没有账号？请
        <span style="color: #0f9876;cursor: pointer;"
              @click="$router.push('/register')">注册</span>
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
  background-color: #0f9876;
  color: white;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>