<template>
  <div class="flex justify-center items-center" v-for="board in boards" :key="board.boardId">
    <Board
      :board="board"
      @remove-board="handleRemoveBoard"
      @comment-board-index-update="handleCommentUpdate"
      @comment-board-index-remove="handleCommentRemove"
      @comment-board-index-send="handleCommentSend"
    />
  </div>
  <div class="flex justify-center mb-[5%]">
    <PageNavigate :totalBoards="maxPageNumber" />
  </div>
</template>

<script setup lang="ts">
import type { ResponseBoard } from "~/types/boards";
import type { CommentRemoveModal, CommentUpdateModal, CommentsDatas } from "~/types/commentUpdateModal";
import Board from '~/components/Board.vue'

const route = useRoute();
const useValidateAccessToken = useValidateAccessTokenStore();
const pageNumber = route.params.id as string;
const totalPages = route.params.totalPages as string;
const maxPageNumber = parseInt(totalPages)
const boards = ref<ResponseBoard[]>([]);

//자식 컴포넌트에서 remove하여 데이터를 삭제하고 boardId값을 받아옴
//해당 boardId값으로 필터를 통해 boards를 초기화 시키고 다시줌
function handleRemoveBoard(boardId: number) {
  boards.value = boards.value.filter((board) => board.boardId !== boardId);
}

//comment가 수정되었을떄
function handleCommentUpdate(commentUpdateModal: CommentUpdateModal) {
  const getId = commentUpdateModal.id;
  const getBoardId = commentUpdateModal.boardId;
  const boardIdx = boards.value.findIndex((board) => board.boardId === getBoardId);
  const commentIdx = boards.value[boardIdx].comments.findIndex((comment) => comment.id === getId);
  boards.value[boardIdx].comments[commentIdx].comment = commentUpdateModal.comment;
}

//comment가 삭제 되었을때
function handleCommentRemove(commentRemoveModal: CommentRemoveModal) {
  const getId = commentRemoveModal.id;
  const getBoardId = commentRemoveModal.boardId;
  const boardIdx = boards.value.findIndex((board) => board.boardId === getBoardId);
  boards.value[boardIdx].comments = boards.value[boardIdx].comments.filter((commentData) => commentData.id !== getId);
}

//comment가 추가되었을때
function handleCommentSend(commentsDatas: CommentsDatas) {
  const getBoardId = commentsDatas.boardId;
  const boardIdx = boards.value.findIndex((board) => board.boardId === getBoardId);
  boards.value[boardIdx].comments.push(commentsDatas);
}


onMounted( async() => {
  useValidateAccessToken.validateAccessToken = await isVerifyAccessTokenFetch();
  const getBoards = await boardGetSizeByPage<ResponseBoard[]>(pageNumber);
  if (getBoards) {
    boards.value = [...getBoards]
  }
  console.log(getBoards);
})
</script>

<style scoped>

</style>