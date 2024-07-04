<template>
  <div
    class="flex-col justify-center items-center w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-5 mb-5"
  >
    <div v-if="updateModalOpen" class="text-black">
      <BoardUpdateModal :updateModal="updateModal" @modalClicked="handleUpdateModalClicked" />
    </div>
    <div v-if="removeModalOpen" class="text-black">
      <BoardRemoveModal :removeModalOpen="removeModalOpen" @modalClicked="handleRemoveModalClicked" />
    </div>
    <div class="flex justify-between mb-5" v-if="showUpdateRemoveButton">
      <svg-icon @click="handleUpdate" type="mdi" :path="mdiIcons.update" class="text-black cursor-pointer"></svg-icon>
      <svg-icon @click="handleRemove" type="mdi" :path="mdiIcons.close" class="text-black cursor-pointer"></svg-icon>
    </div>

    <div class="text-black flex mb-2 w-1/2 rounded-xlh-10 items-center">
      <img :src="profilePath" class="w-10 h-10 rounded-full overflow-hidden border border-black" />
      <div class="ml-4">
        {{ board.nickname }}
      </div>
    </div>
    <h5 class="flex justify-center mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ board.title }}</h5>
    <div class="flex justify-between text-sm"></div>
    <div class="flex justify-center">
      <div v-if="boardImageUrlPath" class="max-w-[50%] max-h-[50%]">
        <img :src="boardImageUrlPath" />
      </div>
    </div>
    <p class="flex justify-center font-normal text-gray-700 dark:text-gray-400 mb-5 mt-5">{{ board.description }}</p>
    <div class="flex justify-between text-black cursor-pointer">
      <svg-icon type="mdi" :path="isLike" @click="likeClicked"></svg-icon>
      <svg-icon type="mdi" :path="isComment" @click="commnetClicked"></svg-icon>
      <svg-icon type="mdi" :path="isShare" @click="shareClicked"></svg-icon>
    </div>
    <div v-if="isComment === mdiIcons.comment" class="text-black mt-5">
      <Comment :commentDatasSendCommentModal="commentDatas" @comment-board-send="handleComment" @comment-board-update="handleCommentUpdate" @comment-board-remove="handleCommentRemove" />
    </div>
    <div v-if="isShare === mdiIcons.share">
      <ShareModal :shareBoard="shareBoard" @-share-modal="handleShare" />
    </div>
    <div class="flex justify-between mt-5 text-sm">
      <div class="text-black">{{ formatDate(props.board.createdAt) }}</div>
      <div class="text-black">{{ formatDate(props.board.updatedAt) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResponseBoard, ShareBoard, UpdateBoardRequest } from "~/types/boards";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCloseBoxMultiple, mdiUpdate, mdiThumbUpOutline, mdiThumbUp, mdiComment, mdiShare, mdiCommentOutline, mdiShareOutline } from "@mdi/js";
import type { ResponseUpdateModal, UpdateModal } from "~/types/updateModal";
import { DEFAULT_PROFILE_PATH } from "~/paths/pathConstatns";
import { useAccessTokenStore } from "~/stores/accessToken";
import type { CommentDatasSendCommentModal, CommentRemoveModal, CommentUpdateModal } from "~/types/commentUpdateModal";

//midIcon path
const mdiIcons = {
  close: mdiCloseBoxMultiple,
  update: mdiUpdate,
  notLike: mdiThumbUpOutline,
  like: mdiThumbUp,
  comment: mdiComment,
  share: mdiShare,
  notCommnet: mdiCommentOutline,
  notShare: mdiShareOutline,
};

//현재 로그인 되어있는 사용자의 id와, 각 게시글에 저장되있는 memberId가 같은경우에만 update,remove버튼 보여주게하기
const showUpdateRemoveButton = ref<boolean>(false);

//index.vue (부모컴포넌트) 로부터 받을 데이터 타입
const props = defineProps<{
  board: ResponseBoard;
}>();

const commentDatas = reactive<CommentDatasSendCommentModal>({
  commentDatas: props.board.comments,
  createMemberBoardId: props.board.memberId,
});

watch(
  () => props.board.comments,
  (newComments) => {
    commentDatas.commentDatas = newComments;
  }
);

//좋아요 버튼 클릭 여부 확인
const isLike = ref<string>(mdiIcons.notLike);
//댓글 버튼 클릭 여부 확인
const isComment = ref<string>(mdiIcons.notCommnet);
//공유 버튼 클릭 여부 확인
const isShare = ref<string>(mdiIcons.notShare);

//ShareModal 체크용
const isSharedClick = ref<boolean>(false);

const profilePath = ref<string>("");

//ShareModal 데이터 보내기
const shareBoard = reactive<ShareBoard>({
  board: props.board,
  isShared: isSharedClick.value,
});

//맨처음 화면 로드했을떄 board에 있는 img 가져오기
const boardImageUrlPath = ref<string | null>(null);

//현재 로그인 되어있는 사용자의 id
const loginMyId = ref<number | null>((await getCookie()) ? JwtDecode(await getCookie()).id : null);
//로그인 여부 확인
async function isLoginCheck() {
  const isLogin = (await isVerifyAccessTokenFetch()) ? true : false;
  if (!isLogin) {
    alert("로그인 되어있지 않습니다");
    return false;
  }
  return true;
}

//props로 받아온 각 보드의 아이디로 백엔드에게 요청하여, 해당 아이디에 맞는 이미지 url 가져옴
onMounted(async () => {
  //board img 가져오기
  const boardImagePath = await boardGetImageByIdFetch<string>(`getBoardImage/${props.board.boardId}`);
  const memberProfilePath = await memberGetProfileFetch<string>(`getProfileImg/${props.board.memberId}`);
  if (memberProfilePath) profilePath.value = memberProfilePath;
  else profilePath.value = DEFAULT_PROFILE_PATH;
  if (boardImagePath) boardImageUrlPath.value = boardImagePath;
  if (loginMyId.value) {
    for (const like of props.board.likes) {
      //현재 로그인되어있는 사용자의 id와
      // 각 게시글의 id가 같으면서
      //boolean값이 true일떄
      //isLike.value = isLike.value === mdiIcons.notLike ? mdiIcons.like : mdiIcons.notLike;
      if (loginMyId.value === like.memberId && props.board.boardId === like.boardId && like.liked) {
        isLike.value = isLike.value === mdiIcons.notLike ? mdiIcons.like : mdiIcons.notLike;
      }
    }
  }
  if (loginMyId.value && loginMyId.value === props.board.memberId) showUpdateRemoveButton.value = true;
});
const useAccessToken = useAccessTokenStore();

//업데이트나,삭제 버튼 눌렀을때 해당 props.board.memberId와 / 로그인되어있는 유저의 memberId를 비교해 서로다르면 클릭했을떄 alert창 뜨게하기 권한없다고
//update,remove 버튼 클릭이벤트에 각자 ㄱㄱ
function updateRemoveButtonClick(): boolean {
  if (!useAccessToken.accessToken) {
    alert("현재 로그인 되어 있지 않습니다");
    return false;
  } else if (useAccessToken.accessToken) {
    const boardMemberId = props.board.memberId;
    const loginMemberId = JwtDecode(useAccessToken.accessToken).id;
    if (boardMemberId !== loginMemberId) {
      alert("접근 권한이 없습니다");
      return false;
    }
  }
  return true;
}

//수정버튼을 눌렸을때 updateModal의 데이터들을 채워줌
//그 정보들을 BoardUpdateModal로 보내줌
async function handleUpdate() {
  if (updateRemoveButtonClick()) updateModalOpen.value = !updateModalOpen.value;
  updateModal.value.updateModalOpen = updateModalOpen.value;
  updateModal.value.title = props.board.title;
  updateModal.value.description = props.board.description;
  if (updateModal.value.updateBoardImage) updateModal.value.updateBoardImage = props.board.boardImagePath;
  
}

//백엔드(update)로 보낼 데이터들
const updateBoardRequest: UpdateBoardRequest = {
  boardId: props.board.boardId,
  memberId: props.board.memberId,
  title: props.board.title,
  description: props.board.description,
  nickname: props.board.nickname,
  updateBoardImage: null,
};

//BoardUpdateModal 으로 부터 받은 데이터 처리
//이게반응 한다는것은 BoardUpdateModal로부터 수정이나,취소,닫기버튼이 클릭 됐다는 뜻
async function handleUpdateModalClicked(updateModal: ResponseUpdateModal) {
  if (updateModal) {
    updateModalOpen.value = !updateModalOpen.value;

    updateBoardRequest.title = updateModal.title;
    updateBoardRequest.description = updateModal.description;
    updateBoardRequest.updateBoardImage = updateModal.updateBoardImage;

    const formData = new FormData();
    formData.append(
      "updateBoard",
      new Blob(
        [
          JSON.stringify({
            boardId: updateBoardRequest.boardId,
            memberId: updateBoardRequest.memberId,
            title: updateBoardRequest.title,
            description: updateBoardRequest.description,
            nickname: updateBoardRequest.nickname,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (updateBoardRequest.updateBoardImage) {
      formData.append("updateBoardImage", updateBoardRequest.updateBoardImage);
    }
    await boardFetch<boolean>("/updateBoard", "PUT", formData);
    const updatedAt = await boardFetch<string>("/getBoardUpdatedAt", "POST", props.board.boardId);
    const getBoardImage = await boardGetImageByIdFetch<string>(`/getBoardImage/${props.board.boardId}`);
    props.board.title = updateModal.title;
    props.board.description = updateModal.description;
    if (getBoardImage) boardImageUrlPath.value = getBoardImage;

    if (updatedAt) props.board.updatedAt = updatedAt;
  } else updateModalOpen.value = !updateModalOpen.value;
}

//board에서 수정버튼이 눌리면
const updateModalOpen = ref<boolean>(false);

//updateBoard로 보낼 데이터들
const updateModal = ref<UpdateModal>({
  updateModalOpen: false,
  title: "",
  description: "",
  updateBoardImage: "",
});

//boardRemove 예정
function handleRemove() {
  if (updateRemoveButtonClick()) removeModalOpen.value = !removeModalOpen.value;
}

//remove 버튼제어
const removeModalOpen = ref<boolean>(false);

//remove 버튼 눌렸을떄 부모컴포넌트에서 즉시 데이터 삭제를 하기위함
const emit = defineEmits(["removeBoard", "comment-board-index-update", "comment-board-index-remove", "comment-board-index-send"]);

//coomnet 댓글 emit받은것
async function handleComment(comment: string) {
  const dataInfo = {
    memberId: loginMyId.value,
    boardId: props.board.boardId,
    comment,
  };
  emit("comment-board-index-send", dataInfo);
  const res = await boardFetch<boolean>("/comment", "POST", dataInfo);
}

//CommentUpdateModal 버튼 눌러졌을떄
async function handleCommentUpdate(commentUpdateModal: CommentUpdateModal) {
  emit("comment-board-index-update", commentUpdateModal);
  await boardFetch("/comment/update", "PUT", commentUpdateModal);
}

//CommentRemoveModal 버튼 눌러졌을떄
async function handleCommentRemove(commentRemoveModal: CommentRemoveModal) {
  emit("comment-board-index-remove", commentRemoveModal);
  await boardFetch("/comment/remove", "DELETE", commentRemoveModal);
}

//BoardRemoveModal 에서 버튼이 눌러졌을때
//option이 있으면 확인 버튼을 눌렀다는 뜻이니 그때 api 호출하기
async function handleRemoveModalClicked(option?: string) {
  removeModalOpen.value = !removeModalOpen.value;
  if (option) {
    const res = await boardFetch<boolean>("removeBoard", "DELETE", props.board.boardId);
    if (res) emit("removeBoard", props.board.boardId);
  }
}

//좋아요 버튼 눌렸을때
async function likeClicked() {
  if (loginMyId.value) {
    likeFetch(loginMyId.value, props.board.boardId);
    isLike.value = isLike.value === mdiIcons.notLike ? mdiIcons.like : mdiIcons.notLike;
  } else alert("로그인 되어있지 않습니다");
}

//댓글버튼 눌렀을때
async function commnetClicked() {
  if (!(await isLoginCheck())) return;
  isComment.value = isComment.value === mdiIcons.notCommnet ? mdiIcons.comment : mdiIcons.notCommnet;
}

//공유버튼 눌렀을때
async function shareClicked() {
  if (!(await isLoginCheck())) return;
  isShare.value = isShare.value === mdiIcons.notShare ? mdiIcons.share : mdiIcons.notShare;
  isSharedClick.value = !isSharedClick.value;
  shareBoard.isShared = isSharedClick.value;
}

//ShareModal에서 공유하기 버튼 눌렀을떄
/**
 *  [ 보낼것들 ]
 *  1. 게시판 작성자의 프로필 이미지 경로
 *  2. 게시판 제목
 *  3. 게시판 본문
 *  4. 게시판 이미지
 *  5. 해당 게시판이 share 인지 아닌지
 *  6. boardId 게시글 id
 *  7. memberId 게시글 작성자
 *  8. nickname 게시글 작성자 nickname
 *  9. loginMemberId
     writerImagePath: await memberGetProfileFetch<string>(`getProfileImg/${board.memberId}`, "GET"),
      boardImagePath: await boardGetImageByIdFetch<string>(`getBoardImage/${board.boardId}`),* 
 *  */
async function handleShare(board: ResponseBoard) {
  isShare.value = isShare.value === mdiIcons.notShare ? mdiIcons.share : mdiIcons.notShare;
  isSharedClick.value = !isSharedClick.value;
  shareBoard.isShared = isSharedClick.value;
  const saved = await boardFetch("/share","POST",board.boardId);
  if (saved) alert("공유 완료 !")
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal-open .modal-overlay + .block {
  z-index: 20;
}
</style>
