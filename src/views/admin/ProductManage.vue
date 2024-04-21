<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { delProductByIdAPI, listProductsByPageAPI } from '@/apis/product'
import ProductUpdate from '@/views/admin/ProductUpdate.vue'
import ProductAdd from '@/views/admin/ProductAdd.vue'

const options = [
  {
    value: 0,
    label: '上架'
  },
  {
    value: 1,
    label: '下架'
  }
]

//表单数据
const form = ref({
  id: '',
  name: '',
  status: ''
})
//表格数据
const tableData = ref<API.ProductInfo[]>()
//总条数
const totalCount = ref<number>(0)
//当前页面
const current = ref<number>(1)
//每页记录数
const pageSize = ref<number>(5)
//控制对话框
const isUpdateVisible = ref<boolean>(false)
const isAddVisible = ref<boolean>(false)
const productUpdateRef = ref(null)
const productAddRef = ref(null)
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
  const res = await listProductsByPageAPI(data)
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
    name: '',
    status: ''
  }
  getTableData()
}

//删除商品信息
const delProductById = (id: number) => {
  ElMessageBox.confirm('此操作将永久删除该商品, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await delProductByIdAPI(id)
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

const closeUpdateDialog = () => {
  isUpdateVisible.value = false
}

const closeAddDialog = () => {
  isAddVisible.value = false
}

const openUpdateDialog = (data: API.ProductInfo) => {
  isUpdateVisible.value = true
  productUpdateRef.value?.initForm(data)
}

const openAddDialog = () => {
  isAddVisible.value = true
}

onMounted(() => getTableData())
</script>

<template>
  <el-card>
    <template #header>
      <el-form inline :model="form" ref="formRef">
        <el-form-item label="商品ID">
          <el-input v-model="form.id" placeholder="请输入ID"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择" clearable style="width: 150px">
            <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData">查询</el-button>
          <el-button type="info" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-button type="primary" @click="openAddDialog">+ 新增商品</el-button>
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" align="center" header-align="center" width="80px"></el-table-column>
      <el-table-column label="图片" align="center" header-align="center">
        <template #default="scope">
          <el-image style="width: 80px; height: 80px" :src="scope?.row.image" :fit="'fill'" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center" header-align="center"></el-table-column>
      <el-table-column label="状态" align="center" header-align="center">
        <template #default="scope">
          {{ scope.row.status === 0 ? '上架' : '下架' }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" header-align="center"></el-table-column>
      <el-table-column prop="stock" label="库存" align="center" header-align="center"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center" header-align="center"
                       width="180px"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center" header-align="center" width="180px">
        <template #default="scope">
          <el-button type="text" @click="openUpdateDialog(scope?.row)">编辑</el-button>
          <el-button type="text" @click="delProductById(scope?.row.id)">删除</el-button>
          <el-button type="text">上架</el-button>
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
    <ProductAdd ref="productAddRef" :is-visible="isAddVisible" @update:isVisible="closeAddDialog"
                @get-table-data="getTableData" />
    <ProductUpdate ref="productUpdateRef" :is-visible="isUpdateVisible" @update:isVisible="closeUpdateDialog"
                   @get-table-data="getTableData" />
  </el-card>
</template>

<style scoped>

</style>