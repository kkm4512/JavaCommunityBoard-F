<template>

<nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-base h-10">
    <li>
      <NuxtLink :to="`/inquiry/${Math.max(props.datas.curPage - 1,1)}/getInquiry`" 
      class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      Previous</NuxtLink>
    </li>
    <li v-for="page of disPlayedPages" :key="page">
      <NuxtLink :to="`/inquiry/${page}/getInquiry`" 
      :class="['flex items-center justify-center px-4 h-10 leading-tight', 
      page === props.datas.curPage ?  'bg-blue-500 dark:text-gray-400 dark:hover:text-white' :  'hover:bg-gray-200 bg-white text-black']">
      {{ page }}</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="`/inquiry/${Math.min(props.datas.curPage + 1,props.datas.totalPages)}/getInquiry`"
      class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      Next</NuxtLink>
    </li>
  </ul>
</nav>

</template>

<script setup lang="ts">
const props = defineProps<{
  datas:Datas
}>()

const curPage = ref<number>(props.datas.curPage);
const totalPages = ref<number>(props.datas.totalPages);

watchEffect( () => {
  totalPages.value = Math.ceil (props.datas.totalPages/3)
} )

const  { disPlayedPages } = pageComputed(curPage,totalPages)



interface Datas {
  totalPages: number;
  curPage: number;
}



</script>

<style scoped>

</style>