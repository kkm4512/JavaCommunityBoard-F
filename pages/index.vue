<template>

</template>

<script setup lang="ts">
import type { ResponseBoard } from '~/types/boards';
const router = useRouter();

const { data: boardDatas } = await useAsyncData('boardDatas', async () => {
  const boards = await boardGetAllFetch<ResponseBoard[]>("/getBoards");
  return {
    boards,
  }
  
})

if (boardDatas.value?.boards) {
  const maxPageNumber = boardDatas.value?.boards.length
  router.push(`/board/1/${maxPageNumber}`)  
}

</script>

<style scoped></style>
