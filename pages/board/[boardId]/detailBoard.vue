<template>
  <div class="flex justify-center">
    <DetailBoard v-if="board" :board="board" 
      @remove-board="handleRemoveBoard"
      @comment-board-index-update="handleCommentUpdate"
      @comment-board-index-remove="handleCommentRemove"
      @comment-board-index-send="handleCommentSend"    
    />
  </div>
</template>

<script setup lang="ts">
import type { ResponseBoard } from '~/types/boards';
import type { CommentRemoveModal, CommentsDatas, CommentUpdateModal } from '~/types/commentUpdateModal';

const route = useRoute()
const router = useRouter()
const board = ref<ResponseBoard | null>();

onMounted( async() => {
  const res = await getBoardByBoardId<ResponseBoard>(parseInt(route.params.boardId as string) )
  if (res) board.value = res;
} )

//자식 컴포넌트에서 remove하여 데이터를 삭제하고 boardId값을 받아옴
//해당 boardId값으로 필터를 통해 boards를 초기화 시키고 다시줌
function handleRemoveBoard(boardId: number) {
  board.value = null;
  alert("해당 게시물은 존재하지 않습니다")
  router.push("/")
}

//comment가 수정되었을떄
function handleCommentUpdate(commentUpdateModal: CommentUpdateModal) {
  const getId = commentUpdateModal.id;
  if (board.value) {
    const commentIdx = board.value.comments.findIndex((comment) => comment.id === getId);
    board.value.comments[commentIdx].comment = commentUpdateModal.comment;
  }

}

//comment가 삭제 되었을때
function handleCommentRemove(commentRemoveModal: CommentRemoveModal) {
  const getId = commentRemoveModal.id;
  if (board.value) {
    board.value.comments = board.value.comments.filter((commentData) => commentData.id !== getId);
  }
  
}

//comment가 추가되었을때
function handleCommentSend(commentsDatas: CommentsDatas) {
  const getBoardId = commentsDatas.boardId;
  if (board.value) board.value.comments.push(commentsDatas);
}

</script>

<style scoped>

</style>