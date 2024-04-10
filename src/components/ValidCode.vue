<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface codeItem {
  code: string,
  color: string,
  padding: string,
  transform: string
}

const emit = defineEmits(['update:value'])

const length = ref(4)
const codeList = ref<codeItem[]>([])

const createCode = () => {
  let len = length.value,
    initCodeList = [],
    chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
    charsLen = chars.length
  // 生成
  for (let i = 0; i < len; i++) {
    let rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
    initCodeList.push({
      code: chars.charAt(Math.floor(Math.random() * charsLen)),
      color: `rgb(${rgb})`,
      padding: `${[Math.floor(Math.random() * 10)]}px`,
      transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
    })
  }
  // 指向
  codeList.value = initCodeList
  // 将当前数据派发出去
  emit('update:value', initCodeList.map(item => item.code).join(''))
}

const refreshCode = () => {
  createCode()
}

const getStyle = (data: any) => {
  return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
}

onMounted(() => createCode())
</script>

<template>
  <div class="ValidCode disabled-select" style="width: 100%; height: 100%" @click="refreshCode">
    <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{ item.code }}</span>
  </div>
</template>

<style scoped>
.ValidCode {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.ValidCode span {
  display: inline-block;
  font-size: 18px;
}
</style>