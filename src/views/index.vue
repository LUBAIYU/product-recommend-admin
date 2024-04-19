<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Expand, Fold, Star } from '@element-plus/icons-vue'
import { logoutAPI } from '@/apis/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()
//控制侧边栏的折叠
const isCollapse = ref(false)
//侧边栏宽度
const asideWidth = ref('200px')

//控制菜单的展开与折叠
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
  asideWidth.value = isCollapse.value ? '64px' : '200px'
}

//退出登录
const logout = async () => {
  const res = await logoutAPI()
  if (res.code === 200) {
    await router.push('/login')
  } else {
    ElMessage.error(res.message)
  }
}

onMounted(() => {
  const loginUser = userStore.currentUser
  if (!loginUser) {
    ElMessage.error('未登录')
    router.push('/login')
  }
})
</script>

<template>
  <div>
    <el-container>
      <!--侧边栏-->
      <el-aside :width="asideWidth" style="min-height: 100vh; background-color: #001529;">
        <div class="logo">
          <img alt="" src="../../public/favicon.ico" width="40px" height="40px">
          <span class="logo-title" v-show="!isCollapse" style="margin-left: 10px">商品推荐系统</span>
        </div>
        <el-menu :collapse="isCollapse" :collapse-transition="false" background-color="#001529"
                 style="border: none;" default-active="/product"
                 text-color="rgba(255,255,255,0.65)"
                 active-text-color="#fff" router>
          <el-menu-item index="/product">
            <el-icon>
              <Star />
            </el-icon>
            <span>商品推荐</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!--头部区域-->
        <el-header>
          <el-icon :size="26" @click="handleCollapse">
            <Fold v-if="asideWidth==='200px'" />
            <Expand v-else />
          </el-icon>
          <div class="dropdown-style">
            <el-dropdown>
              <div style="display: flex; justify-content: center; align-items: center">
                <img src="../../public/favicon.ico" alt="" width="40px" height="40px" style="margin: 0 5px">
                <span>张三</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/index/person')">个人信息</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <!--主体区域-->
        <el-main>
          <!--动态展示主页-->
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
@import "@/css/global.css";
</style>