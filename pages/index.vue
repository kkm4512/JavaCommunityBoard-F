<template>
  <div class="flex justify-center items-center" v-for="board in boards" :key="board.boardId">
    <Board :board="board" @remove-board="handleRemoveBoard"/>
  </div>
</template>

<script setup lang="ts">
import type { ResponseBoard } from "~/types/boards";

const useValidateAccessToken = useValidateAccessTokenStore();
const boards = ref<ResponseBoard[]>([]);

//자식 컴포넌트에서 remove하여 데이터를 삭제하고 boardId값을 받아옴
//해당 boardId값으로 필터를 통해 boards를 초기화 시키고 다시줌
function handleRemoveBoard(boardId:number){
  boards.value =  boards.value.filter(board => board.boardId !== boardId)
}

onMounted(async () => {
  useValidateAccessToken.updateValidateAccessToken(await isVerifyAccessTokenFetch());
  const responses = await boardGetAllFetch<ResponseBoard[]>("/getBoards");
  if (responses) {
    for (const response of responses) {
      boards.value.push(response);
    }
  }
});
</script>

<style scoped></style>
