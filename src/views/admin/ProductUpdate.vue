<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { updateProductAPI } from '@/apis/product'

const props = defineProps([
  //控制弹窗显示隐藏
  'isVisible'
])

const emit = defineEmits(['update:isVisible', 'getTableData'])
const formRef = ref()
const form = ref<API.ProductInfo>({
  createTime: '',
  description: '',
  id: '',
  image: '',
  name: '',
  price: '',
  status: '',
  stock: '',
  updateTime: ''
})

//更新头像成功的回调函数
const uploadSuccess = (res: API.Result) => {
  if (res.code === 200) {
    form.value.image = res.data
  } else {
    ElMessage.error(res.message)
  }
}

const handleDialogClose = () => {
  form.value = {
    createTime: '',
    description: '',
    id: '',
    image: '',
    name: '',
    price: '',
    status: '',
    stock: '',
    updateTime: ''
  }
  emit('update:isVisible')
}

//取消编辑
const close = () => {
  form.value = {
    createTime: '',
    description: '',
    id: '',
    image: '',
    name: '',
    price: '',
    status: '',
    stock: '',
    updateTime: ''
  }
  emit('update:isVisible')
}

//初始化表单数据
const initForm = (data: API.ProductInfo) => {
  form.value = data
}

//修改商品信息
const updateProductInfo = async () => {
  const res = await updateProductAPI({
    ...form.value
  })
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
      <el-form-item label="图片" prop="userAvatar">
        <div>
          <el-upload
            name="multipartFile"
            class="avatar-uploader"
            action="http://localhost:8080/user/upload/avatar"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <img v-if="form.image" :src="form.image" class="avatar" alt="">
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="名称" prop="userName">
        <el-input v-model="form.name" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input v-model="form.stock" style="width: 280px"></el-input>
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
          <el-button type="primary" @click="updateProductInfo">保存</el-button>
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