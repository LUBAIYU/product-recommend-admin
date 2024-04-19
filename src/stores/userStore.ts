import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  //定义登录用户信息
  const currentUser = ref<API.UserInfo>()
  //设置登录用户信息
  const setCurrentUser = (user: API.UserInfo) => {
    currentUser.value = user
  }
  //获取登录用户信息
  const getCurrentUser = () => {
    return currentUser.value
  }
  //返回
  return {
    currentUser,
    setCurrentUser,
    getCurrentUser
  }
})