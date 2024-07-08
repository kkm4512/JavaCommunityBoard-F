<template>
  <nav aria-label="Page navigation example" v-if="useAccessToken.accessToken">
    <ul class="inline-flex -space-x-px text-base h-10">
      <li v-if="curPage !== 1">
        <NuxtLink
          :to="`/myPage/${pageNavigateMyPageData.memberId}/${Math.max(props.pageNavigateMyPageData.curPage-1,1)}/${props.pageNavigateMyPageData.totalBoards}`"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Previous</NuxtLink
        >
      </li>
      <div v-for="page in disPlayedPages" :key="page">
        <li>
          <NuxtLink
            :to="`/myPage/${pageNavigateMyPageData.memberId}/${page}/${props.pageNavigateMyPageData.totalBoards}`"
            :class="[
              'flex items-center justify-center px-4 h-10 leading-tight border',
              page === pageNavigateMyPageData.curPage ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            ]"
            >{{ page }}</NuxtLink
          >
        </li>
      </div>
      <li v-if="curPage !== totalPages">
        <NuxtLink
          :to="`/myPage/${pageNavigateMyPageData.memberId}/${Math.min(props.pageNavigateMyPageData.curPage+1,totalPages)}/${props.pageNavigateMyPageData.totalBoards}`"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Next</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { PageNavigateMyPageData } from '~/types/pageNavigateMyPageData';
const curPage = ref<number>(0);
const useAccessToken = useAccessTokenStore();

const props = defineProps<{
  pageNavigateMyPageData: PageNavigateMyPageData
}>();

// 총 페이지 수 계산
const ITEMS_PER_PAGE = 3;
const totalPages = ref<number>(Math.ceil(props.pageNavigateMyPageData.totalBoards / ITEMS_PER_PAGE));

watchEffect( () => {
  totalPages.value = Math.ceil(props.pageNavigateMyPageData.totalBoards / ITEMS_PER_PAGE);
  curPage.value = props.pageNavigateMyPageData.curPage;
} )

const { disPlayedPages } = pageComputed(curPage,totalPages);


</script>

<style scoped></style>
