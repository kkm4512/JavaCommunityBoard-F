<template>
  <nav aria-label="Page navigation example" v-if="useAccessToken.accessToken">
    <ul class="inline-flex -space-x-px text-base h-10">
      <li v-if="curPage !== 1">
        <NuxtLink
        :to="`/board/${Math.max(curPage-1,1)}/${props.datas.totalPages}`"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </NuxtLink>
      </li>
      <div v-for="page in disPlayedPages" :key="page">
        <li>
          <NuxtLink
          :to="`/board/${page}/${props.datas.totalPages}`"
          :class="[
              'flex items-center justify-center px-4 h-10 leading-tight border',
              page === datas.curPage ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            ]"
            >{{ page }}</NuxtLink
          >
        </li>
      </div>
      <li v-if="curPage !== totalPages">
        <NuxtLink
        :to="`/board/${Math.min(curPage+1,totalPages)}/${props.datas.totalPages}`"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Next</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

const useAccessToken = useAccessTokenStore();

interface Datas {
  totalPages: number;
  curPage: number;

}
const props = defineProps<{
  datas: Datas;
}>();

const curPage = ref<number>(1);


// 총 페이지 수 계산
const ITEMS_PER_PAGE = 3;
const totalPages = ref<number>(Math.ceil(props.datas.totalPages / ITEMS_PER_PAGE));
const { disPlayedPages } = pageComputed(curPage,totalPages);

watchEffect(() => {
  curPage.value = props.datas.curPage;
  totalPages.value = Math.ceil(props.datas.totalPages / ITEMS_PER_PAGE);
});
</script>

<style scoped></style>
