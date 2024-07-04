<template>
  <div class="flex justify-center items-center" v-for="board in boards" :key="board.boardId">
    <Board :board="board" @remove-board="handleRemoveBoard" @comment-board-index-update="handleCommentUpdate" @comment-board-index-remove="handleCommentRemove" @comment-board-index-send="handleCommentSend"/>
  </div>
  <div class="flex justify-center items-center" v-for="shareBoard in shareBoards" :key="shareBoard.id">
    <ShareBoard :shareBoard="shareBoard" @share-remove-board="handleShareRemoveBoard"/>
  </div>  
  <div class="flex justify-center mb-[5%]">
    <PageNavigateMyPage :pageNavigateMyPageData="pageNavigateMyPageData" />
  </div>
</template>

<script setup lang="ts">
import type { ResponseBoard, ResponseShareBoard } from '~/types/boards';
import type { CommentRemoveModal, CommentUpdateModal, CommentsDatas } from '~/types/commentUpdateModal';


const boards = ref<ResponseBoard[]>([]);
const shareBoards = ref<ResponseShareBoard[]>([]);
const useAccessToken = useAccessTokenStore()
const route = useRoute();
const memberId = route.params.id as string;
const pageNavigateMyPageData = {
  totalBoards: parseInt(route.params.totalPages as string),
  memberId: memberId,
}

onMounted(async () => {
  const loginMyId = JwtDecode(useAccessToken.accessToken).id;
  const responses = await boardGetAllFetch<ResponseBoard[]>(`/getBoards/${loginMyId}`);
  if (responses) {
    for (const response of responses) {
      boards.value.push(response);
    }
  }
  const getShareBoards = await boardGetAllById<ResponseShareBoard[]>(`getShareBoards/${loginMyId}`);
  if (getShareBoards) {
    for ( const getShareBoard of getShareBoards ) {
      shareBoards.value.push(getShareBoard)
    }
  }
});

//자식 컴포넌트에서 remove하여 데이터를 삭제하고 boardId값을 받아옴
//해당 boardId값으로 필터를 통해 boards를 초기화 시키고 다시줌
function handleRemoveBoard(boardId: number) {
  boards.value = boards.value.filter((board) => board.boardId !== boardId);
}

function handleShareRemoveBoard(shareBoard: ResponseShareBoard) {
  shareBoards.value = shareBoards.value.filter((board) => board.boardId !== shareBoard.boardId);
}


//comment가 수정되었을떄
function handleCommentUpdate(commentUpdateModal: CommentUpdateModal) {
  const getId = commentUpdateModal.id;
  const getBoardId = commentUpdateModal.boardId;
  const boardIdx = boards.value.findIndex(board => board.boardId === getBoardId);
  const commentIdx = boards.value[boardIdx].comments.findIndex( comment => comment.id === getId )
  boards.value[boardIdx].comments[commentIdx].comment = commentUpdateModal.comment;
}


//comment가 삭제 되었을때
function handleCommentRemove(commentRemoveModal:CommentRemoveModal){
  const getId = commentRemoveModal.id;
  const getBoardId = commentRemoveModal.boardId;
  const boardIdx = boards.value.findIndex(board => board.boardId === getBoardId);
  boards.value[boardIdx].comments = boards.value[boardIdx].comments.filter( commentData => commentData.id !== getId );
}

//comment가 추가되었을때
function handleCommentSend(commentsDatas:CommentsDatas){
  const getBoardId = commentsDatas.boardId;
  const boardIdx = boards.value.findIndex(board => board.boardId === getBoardId);  
  boards.value[boardIdx].comments.push(commentsDatas);
}

</script>

<style scoped>

</style>