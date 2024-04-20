<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { updateUserByIdAPI } from '@/apis/user'
import { getCurrentUser } from '@/states/userState'

const router = useRouter()
//用户信息
const userInfo = ref<API.UserInfo>({
  id: 0,
  userName: '',
  userAvatar: '',
  userPassword: '',
  gender: 0,
  age: 0,
  phone: '',
  address: '',
  createTime: Date.now(),
  updateTime: Date.now()
})

//性别选项
const genderOptions = [
  {
    value: 0,
    label: '男'
  },
  {
    value: 1,
    label: '女'
  }
]

//更新头像成功的回调函数
const uploadSuccess = (res: API.Result) => {
  if (res.code === 200) {
    userInfo.value.userAvatar = res.data
  } else {
    ElMessage.error(res.message)
  }
}

//修改用户信息
const updateUserInfo = async () => {
  const res = await updateUserByIdAPI(userInfo.value)
  if (res.code === 200) {
    ElMessage.success('修改成功')
    router.back()
  } else {
    ElMessage.error(res.message)
  }
}

onMounted(() => {
  const loginUser = getCurrentUser()
  if (loginUser) {
    userInfo.value = loginUser
  }
})
</script>

<template>
  <el-card>
    <el-form :model="userInfo" label-width="85px">
      <el-form-item label="头像" prop="userAvatar">
        <div>
          <el-upload
            name="multipartFile"
            class="avatar-uploader"
            action="http://localhost:8080/user/upload/avatar"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <img v-if="userInfo.userAvatar" :src="userInfo.userAvatar" class="avatar" alt="">
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input style="width: 300px" v-model="userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select style="width: 300px;" v-model="userInfo.gender" placeholder="请选择" clearable>
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number min="1" max="100" style="width: 300px;" v-model="userInfo.age"></el-input-number>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input style="width: 300px;" v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input style="width: 300px;" v-model="userInfo.address"></el-input>
      </el-form-item>
      <el-form-item prop="operation">
        <el-button type="primary" @click="updateUserInfo">保存</el-button>
        <el-button type="info" @click="router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>