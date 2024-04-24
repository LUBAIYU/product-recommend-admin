import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  //用户信息
  const currentUser = ref<API.UserInfo>()
  //设置用户信息
  const setCurrentUser = (user: API.UserInfo | undefined) => {
    currentUser.value = user
  }
  //获取用户信息
  const getCurrentUser = (): API.UserInfo | undefined => {
    return currentUser.value
  }
  //返回
  return {
    setCurrentUser,
    getCurrentUser
  }
})