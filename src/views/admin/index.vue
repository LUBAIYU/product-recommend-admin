<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Expand, Fold, Shop, UserFilled } from '@element-plus/icons-vue'
import { logoutAPI } from '@/apis/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCurrentUser, setCurrentUser } from '@/states/userState'

const router = useRouter()
//控制侧边栏的折叠
const isCollapse = ref(false)
//侧边栏宽度
const asideWidth = ref('200px')
//登录用户名称
const userName = ref('')

//控制菜单的展开与折叠
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
  asideWidth.value = isCollapse.value ? '64px' : '200px'
}

//退出登录
const logout = async () => {
  const res = await logoutAPI()
  if (res.code === 200) {
    setCurrentUser(null)
    await router.push('/login')
  } else {
    ElMessage.error(res.message)
  }
}

//获取当前登录用户
const getLoginUser = async () => {
  const loginUser = getCurrentUser()
  if (loginUser) {
    userName.value = loginUser.userName
    return
  }
  await router.push('/login')
}

onMounted(() => getLoginUser())
</script>

<template>
  <div>
    <el-container>
      <!--侧边栏-->
      <el-aside :width="asideWidth" style="min-height: 100vh; background-color: #001529;">
        <div class="logo">
          <img alt="" src="../../../public/favicon.ico" width="40px" height="40px">
          <span class="logo-title" v-show="!isCollapse" style="margin-left: 10px">商品推荐系统</span>
        </div>
        <el-menu :collapse="isCollapse" :collapse-transition="false" background-color="#001529"
                 style="border: none;" :default-active="$route.path"
                 text-color="rgba(255,255,255,0.65)"
                 active-text-color="#fff" router>
          <el-menu-item index="/admin/user-manage">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/product-manage">
            <el-icon>
              <Shop />
            </el-icon>
            <span>商品管理</span>
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
                <img src="../../../public/favicon.ico" alt="" width="40px" height="40px" style="margin: 0 5px">
                <span>{{ userName }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/admin/person')">个人信息</el-dropdown-item>
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