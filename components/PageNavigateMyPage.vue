<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-base h-10">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Previous</a
        >
      </li>
      <div v-for="page in totalPages" :key="page">
        <li>
          <NuxtLink
            :to="`/myPage/${pageNavigateMyPageData.memberId}/${page}/${props.pageNavigateMyPageData.totalBoards}`"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >{{ page }}</NuxtLink
          >
        </li>
      </div>
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { PageNavigateMyPageData } from '~/types/pageNavigateMyPageData';

const props = defineProps<{
  pageNavigateMyPageData: PageNavigateMyPageData
}>();

// 총 페이지 수 계산
const ITEMS_PER_PAGE = 3;
const totalPages = ref<number>(Math.ceil(props.pageNavigateMyPageData.totalBoards / ITEMS_PER_PAGE));

watchEffect( () => {
  totalPages.value = Math.ceil(props.pageNavigateMyPageData.totalBoards / ITEMS_PER_PAGE);
} )


</script>

<style scoped></style>
