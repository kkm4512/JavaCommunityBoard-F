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
    <div class="flex justify-between mb-5">
      <svg-icon @click="handleUpdate" type="mdi" :path="midIcons.update" class="text-black cursor-pointer"></svg-icon>
      <svg-icon @click="handleRemove" type="mdi" :path="midIcons.close" class="text-black cursor-pointer"></svg-icon>
    </div>
    <div class="text-black flex mb-2 border-2 w-1/2 rounded-xl justify-center border-blue-300">{{ board.nickname }}</div>
    <h5 class="flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ board.title }}</h5>
    <p class="flex justify-center font-normal text-gray-700 dark:text-gray-400 mb-5">{{ board.description }}</p>
    <div class="flex justify-between text-sm">
      <div class="text-black">{{ formatDate(props.board.createdAt) }}</div>
      <div class="text-black">{{ formatDate(props.board.updatedAt) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResponseBoard, UpdateBoardRequest } from "~/types/boards";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCloseBoxMultiple, mdiFlaskEmpty, mdiUpdate } from "@mdi/js";
import type { UpdateModal } from "~/types/updateModal";

//midIcon path
const midIcons = ref({
  close: mdiCloseBoxMultiple,
  update: mdiUpdate,
});

const useAccessToken = useAccessTokenStore();

//업데이트나,삭제 버튼 눌렀을때 해당 props.board.memberId와 / 로그인되어있는 유저의 memberId를 비교해 서로다르면 클릭했을떄 alert창 뜨게하기 권한없다고
//update,remove 버튼 클릭이벤트에 각자 ㄱㄱ
function updateRemoveButtonClick(): boolean{
  if (!useAccessToken.accessToken) {
    alert("현재 로그인 되어 있지 않습니다");
    return false
  } else if (useAccessToken.accessToken) {
    const boardMemberId = props.board.memberId;
    const loginMemberId = JwtDecode(useAccessToken.accessToken).id;
    if (boardMemberId !== loginMemberId) {
      alert("접근 권한이 없습니다");
      return false
    }
  }
  return true;
}

//index.vue (부모컴포넌트) 로부터 받을 데이터 타입
const props = defineProps<{
  board: ResponseBoard;
}>();


//수정버튼을 눌렸을때 updateModal의 데이터들을 채워줌
//그 정보들을 BoardUpdateModal로 보내줌
function handleUpdate() {
  if (updateRemoveButtonClick())
  updateModalOpen.value = !updateModalOpen.value;
  updateModal.value.updateModalOpen = updateModalOpen.value;
  updateModal.value.title = props.board.title;
  updateModal.value.description = props.board.description;
}

//백엔드(update)로 보낼 데이터들
const updateBoardRequest: UpdateBoardRequest = {
  boardId: props.board.boardId,
  memberId: props.board.memberId,
  title: props.board.title,
  description: props.board.description,
  nickname: props.board.nickname,
};

//BoardUpdateModal 으로 부터 받은 데이터 처리
//이게반응 한다는것은 BoardUpdateModal로부터 수정이나,취소,닫기버튼이 클릭 됐다는 뜻
async function handleUpdateModalClicked(updateModal: UpdateModal) {
  if (updateModal) {
    updateModalOpen.value = !updateModalOpen.value;
    props.board.title = updateModal.title;
    props.board.description = updateModal.description;
    updateBoardRequest.title = updateModal.title;
    updateBoardRequest.description = updateModal.description;
    const res = await boardFetch<boolean>("/updateBoard", "PUT", updateBoardRequest);
    const updatedAt = await boardFetch<string>("/getBoardUpdatedAt", "POST", props.board.boardId);
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
});

//boardRemove 예정
function handleRemove() {
   if (updateRemoveButtonClick()) 
   removeModalOpen.value = !removeModalOpen.value;
}

//remove 버튼제어
const removeModalOpen = ref<boolean>(false);

//remove 버튼 눌렸을떄 부모컴포넌트에서 즉시 데이터 삭제를 하기위함
const emit = defineEmits(["removeBoard"]);

//BoardRemoveModal 에서 버튼이 눌러졌을때
//option이 있으면 확인 버튼을 눌렀다는 뜻이니 그때 api 호출하기
async function handleRemoveModalClicked(option?: string) {
  removeModalOpen.value = !removeModalOpen.value;
  if (option) {
    const res = await boardFetch<boolean>("removeBoard", "DELETE", props.board.boardId);
    if (res) emit("removeBoard", props.board.boardId);
  }
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
