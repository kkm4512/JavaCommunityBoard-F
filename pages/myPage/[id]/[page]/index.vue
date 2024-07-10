<template>
  <div class="flex justify-center items-center" v-for="board in boards" :key="board.boardId">
    <Board
      :board="board"
      @remove-board="handleRemoveBoard"
      @comment-board-index-update="handleCommentUpdate"
      @comment-board-index-remove="handleCommentRemove"
      @comment-board-index-send="handleCommentSend"
      @share-removeBoard="handleShareRemoveBoard"
    />
  </div>
  <div class="flex justify-center mb-[5%]">
    <PageNavigateMyPage :pageNavigateMyPageData="pageNavigateMyPageData" />
  </div>
</template>

<script setup lang="ts">
import type { ResponseBoard, ResponseShareBoard } from "~/types/boards";
import type { CommentRemoveModal, CommentUpdateModal, CommentsDatas } from "~/types/commentUpdateModal";

const getBoardsMaxPage = ref<number>(0);
const getShareBoardsMaxPage = ref<number>(0);
const boards = ref<ResponseBoard[]>([]);
const useAccessToken = useAccessTokenStore();
const route = useRoute();
const memberId = route.params.id as string;
const pageNumber = route.params.page as string;
const pageNavigateMyPageData = reactive({
  totalBoards: 0,
  memberId: memberId,
  curPage: parseInt(route.params.page as string),
});

onMounted(async () => {
  const loginMyId = JwtDecode(useAccessToken.accessToken).id;
  const getAllBoards = await allBoardGetSizeByPageAndLoginMemberId<ResponseBoard[]>(pageNumber, loginMyId);
  if (getAllBoards) {
    for (const board of getAllBoards) {
      boards.value.push(board);
    }
    pageNavigateMyPageData.totalBoards = getAllBoards.length;
  }
  const getBoards = await boardGetAllById<ResponseBoard[]>(`/getBoards/${JwtDecode(useAccessToken.accessToken).id.toString()}`);
  if (getBoards) {
    pageNavigateMyPageData.totalBoards += getBoards.length
  }
  const getShareBoards = await boardGetAllById<ResponseBoard[]>(`/getShareBoards/${JwtDecode(useAccessToken.accessToken).id.toString()}`);
  if (getShareBoards) {
    pageNavigateMyPageData.totalBoards += getShareBoards.length
  }
});

//자식 컴포넌트에서 remove하여 데이터를 삭제하고 boardId값을 받아옴
//해당 boardId값으로 필터를 통해 boards를 초기화 시키고 다시줌
function handleRemoveBoard(boardId: number) {
  boards.value = boards.value.filter((board) => board.boardId !== boardId);
  pageNavigateMyPageData.totalBoards--;
}

function handleShareRemoveBoard(shareBoard: ResponseShareBoard) {
  boards.value = boards.value.filter((board) => board.sharedId !== shareBoard.sharedId);
  pageNavigateMyPageData.totalBoards--;
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
</script>

<style scoped></style>
