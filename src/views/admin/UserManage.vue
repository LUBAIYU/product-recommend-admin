<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { delUserByIdAPI, listUsersByPageAPI } from '@/apis/user'
import { type ElForm, ElMessage, ElMessageBox } from 'element-plus'
import UserUpdate from '@/views/admin/UserUpdate.vue'

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

//表单数据
const form = ref({
  id: '',
  userName: '',
  gender: ''
})
//表格数据
const tableData = ref<API.UserInfo[]>()
//总条数
const totalCount = ref<number>(0)
//当前页面
const current = ref<number>(1)
//每页记录数
const pageSize = ref<number>(5)
//控制对话框
const isVisible = ref<boolean>(false)
const userUpdateRef = ref(null)
//更改页面
const handleCurrentChange = (val: number) => {
  current.value = val
}
//更改每页记录数
const handlePageSizeChange = (val: number) => {
  pageSize.value = val
}

//获取表格数据
const getTableData = async () => {
  const data = {
    current: current.value,
    pageSize: pageSize.value,
    ...form.value
  }
  const res = await listUsersByPageAPI(data)
  if (res.code === 200) {
    tableData.value = res.data.records
    totalCount.value = res.data.total
  } else {
    ElMessage.error(res.message)
  }
}

//清空表格
const clear = () => {
  form.value = {
    id: '',
    userName: '',
    gender: ''
  }
  getTableData()
}

//删除用户信息
const delUserById = (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await delUserByIdAPI(id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      await getTableData()
    } else {
      ElMessage.error(res.message)
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const closeDialog = () => {
  isVisible.value = false
}

const openDialog = (data: API.UserInfo) => {
  isVisible.value = true
  userUpdateRef.value?.initForm(data)
}

onMounted(() => getTableData())
</script>

<template>
  <el-card>
    <template #header>
      <el-form inline :model="form" ref="formRef">
        <el-form-item label="用户ID">
          <el-input v-model="form.id" placeholder="请输入ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择" clearable style="width: 150px">
            <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData">查询</el-button>
          <el-button type="info" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" align="center" header-align="center" width="80px"></el-table-column>
      <el-table-column label="头像" align="center" header-align="center">
        <template #default="scope">
          <el-image style="width: 80px; height: 80px" :src="scope?.row.userAvatar" :fit="'fill'" />
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名" align="center" header-align="center">
      </el-table-column>
      <el-table-column label="性别" align="center" header-align="center">
        <template #default="scope">
          {{ scope.row.gender === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center" header-align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" header-align="center"></el-table-column>
      <el-table-column prop="address" label="收货地址" align="center" header-align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center" header-align="center"
                       width="180px"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center" header-align="center" width="180px">
        <template #default="scope">
          <el-button type="primary" @click="openDialog(scope?.row)">编辑</el-button>
          <el-button type="danger" @click="delUserById(scope?.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        style="display: flex;justify-content: flex-end;align-items: center"
        v-model:current-page="current"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @current-change="handleCurrentChange"
        @size-change="handlePageSizeChange" />
    </template>
    <UserUpdate ref="userUpdateRef" :is-visible="isVisible" @get-table-data="getTableData"
                @update:isVisible="closeDialog" />
  </el-card>
</template>

<style scoped>

</style>