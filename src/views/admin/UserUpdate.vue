<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { updateUserByIdAPI } from '@/apis/user'

const props = defineProps([
  //控制弹窗显示隐藏
  'isVisible'
])

const emit = defineEmits(['update:isVisible', 'getTableData'])
const formRef = ref()
const form = ref<API.UserInfo>({
  address: '',
  age: '',
  createTime: '',
  gender: '',
  id: '',
  phone: '',
  updateTime: '',
  userAvatar: '',
  userName: '',
  userPassword: ''
})
const options = [
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
    form.value.userAvatar = res.data
  } else {
    ElMessage.error(res.message)
  }
}

const handleDialogClose = () => {
  form.value = {
    address: '',
    age: '',
    createTime: '',
    gender: '',
    id: '',
    phone: '',
    updateTime: '',
    userAvatar: '',
    userName: '',
    userPassword: ''
  }
  emit('update:isVisible')
}

//取消编辑
const close = () => {
  form.value = {
    address: '',
    age: '',
    createTime: '',
    gender: '',
    id: '',
    phone: '',
    updateTime: '',
    userAvatar: '',
    userName: '',
    userPassword: ''
  }
  emit('update:isVisible')
}

//初始化表单数据
const initForm = (data: API.UserInfo) => {
  form.value = data
}

//修改用户信息
const updateUserInfo = async () => {
  const res = await updateUserByIdAPI({
    ...form.value
  } as API.UpdateUserParams)
  if (res.code === 200) {
    ElMessage.success('修改成功')
    emit('update:isVisible')
    emit('getTableData')
  } else {
    ElMessage.error(res.message)
  }
}

defineExpose({
  initForm
})
</script>

<template>
  <el-dialog :model-value="props.isVisible" :before-close="handleDialogClose" width="30%">
    <el-form :model="form" ref="formRef" label-width="80px">
      <el-form-item label="头像" prop="userAvatar">
        <div>
          <el-upload
            name="multipartFile"
            class="avatar-uploader"
            action="http://localhost:8080/user/upload/avatar"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <img v-if="form.userAvatar" :src="form.userAvatar" class="avatar" alt="">
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" clearable style="width: 280px" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value"
                     :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="form.address" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="form.createTime" readonly style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-input v-model="form.updateTime" readonly style="width: 280px"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
        <span style="display: flex; justify-content: center;align-items: center; margin-top: -15px">
          <el-button type="primary" @click="updateUserInfo">保存</el-button>
          <el-button type="info" @click="close">取消</el-button>
        </span>
    </template>
  </el-dialog>
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