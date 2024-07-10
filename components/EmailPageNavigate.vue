<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-base h-10">
      <li v-if="props.pageDatas.curPage !== 1">
        <NuxtLink
          :to="`/inquiry/${props.pageDatas.curPage - 1}/${loginMyId}/email`"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Previous</NuxtLink
        >
      </li>
      <li v-for="page of disPlayedPages " :key="page">
        <NuxtLink
          :to="`/inquiry/${page}/${loginMyId}/email`"
          :class="[
            'flex items-center justify-center px-4 h-10 leading-tight',
            page === props.pageDatas.curPage ? 'bg-blue-500 dark:text-gray-400 dark:hover:text-white' : 'hover:bg-gray-200 bg-white text-black'
             ]"
          >{{ page }}</NuxtLink
        >
      </li>
      <li v-if="props.pageDatas.curPage !== totalPages">
        <NuxtLink
          :to="`/inquiry/${props.pageDatas.curPage + 1}/${loginMyId}/email`"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Next</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface PageDatas {
  totalPage: number;
  curPage: number;
}

const props = defineProps<{
  pageDatas:PageDatas
}>()

const currentPage = ref<number>(props.pageDatas.curPage);
const totalPages = ref<number>(Math.ceil(props.pageDatas.totalPage/10));


const useAccessToken = useAccessTokenStore();
const loginMyId = ref<number | null>(useAccessToken.accessToken ? JwtDecode(useAccessToken.accessToken).id : null);

const { disPlayedPages } = pageComputed(currentPage,totalPages)





</script>

<style scoped></style>
