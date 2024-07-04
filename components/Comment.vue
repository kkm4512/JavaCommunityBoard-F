<template>
  <div v-if="commentDatasSendCommentModal.commentDatas.length < 5">
    <label for="chat" class="sr-only">Your message</label>
    <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
      <textarea
        v-model="description"
        id="chat"
        rows="1"
        class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your message..."
      ></textarea>
      <button type="submit" @click="commentSendClicked" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
        <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        </svg>
      </button>
    </div>
  </div>
  <div v-else class="border-2 border-black flex justify-center">[ 최대 댓글은 5개까지 작성 가능합니다 ]</div>
  <div v-for="(commentData, i) of commentDatasSendCommentModal.commentDatas" :key="i">
    <div class="flex justify-center border-2 items-center text-sm mt-2">
      <div class="max-w-10 max-h-10 rounded-full overflow-hidden border border-black">
        <img :src="profilePaths[i]" />
      </div>
      <div class="text-xs flex flex-col justify-center ml-2">
        {{ nicknames[i] }}
      </div>
      <div
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-5"
      >
        {{ commentData.comment }}
      </div>
      <div class="flex">
        <div v-if="commentData.memberId === JwtDecode(useAccessToken.accessToken).id">
          <svg-icon
            @click="handleUpdate(commentData.id, commentData.comment, commentData.memberId, commentData.boardId)"
            type="mdi"
            :path="mdiIcons.update"
            class="text-black cursor-pointer w-5"
          ></svg-icon>
        </div>
        <div v-if="commentData.memberId === JwtDecode(useAccessToken.accessToken).id || commentDatasSendCommentModal.createMemberBoardId === JwtDecode(useAccessToken.accessToken).id">
          <svg-icon @click="handleRemove(commentData.id, commentData.memberId, commentData.boardId)" type="mdi" :path="mdiIcons.close" class="text-black cursor-pointer w-5"></svg-icon>
        </div>
      </div>
    </div>
    <div v-if="updateClicked" class="text-black">
      <CommentUpdateModal :commentUpdateModal="commentUpdateModal" @comment-update="handleCommentUpdateClicked" />
    </div>
    <div v-if="removeClicked" class="text-black">
      <CommentRemoveModal :commentRemoveModal="commentRemoveModal" @comment-remove="handleCommentRemoveClicked" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_PROFILE_PATH } from "~/paths/pathConstatns";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCloseBoxMultiple, mdiUpdate } from "@mdi/js";
import type { CommentDatasSendCommentModal, CommentRemoveModal, CommentUpdateModal, CommentsDatas } from "~/types/commentUpdateModal";

//댓글 작성눌렀을때 반응형으로 만들어두려고 임시로 만듬
const memberProfilePath = useMemberProfileImageStore();
const useAccessToken = useAccessTokenStore();

//댓글 작성눌렀을떄 반응형으로 만들어두려고 임시로 만듬
const memberNickname = JwtDecode(useAccessToken.accessToken).nickname;

//midIcon path
const mdiIcons = {
  close: mdiCloseBoxMultiple,
  update: mdiUpdate,
};

//Board로부터 받은 데이터들
const props = defineProps<{
  commentDatasSendCommentModal:CommentDatasSendCommentModal
}>();

//updateButtonClike 확인용도
const updateClicked = ref<boolean>(false);
//removeButtonClike 확인용도
const removeClicked = ref<boolean>(false);

//댓글
const description = ref<string>("");
const profilePaths = ref<string[]>([]);
const nicknames = ref<string[]>([]);

//commentUpdateModal 보낼 data
const commentUpdateModal = reactive<CommentUpdateModal>({
  updateClicked: false,
  id: -1,
  comment: "",
  boardId: -1,
  memberId: -1,
});

//commentRemoveModal 보낼 data
const commentRemoveModal = reactive<CommentRemoveModal>({
  removeClicked: false,
  id: -1,
  boardId: -1,
  memberId: -1,
});

onMounted(async () => {
  for (const commentData of props.commentDatasSendCommentModal.commentDatas) {
    const memberId = commentData.memberId;
    const getProfilePath = await memberGetProfileFetch<string>(`getProfileImg/${memberId}`);
    if (getProfilePath) profilePaths.value.push(getProfilePath);
    else profilePaths.value.push(DEFAULT_PROFILE_PATH);
    const getMemberNickname = await memberGetProfileFetch<string>(`getNickname/${memberId}`);
    if (getMemberNickname) nicknames.value.push(getMemberNickname);
  }
});

const { data:initData } = useAsyncData("initData", async() => {
  const getProfilePaths = [];
  const getMemberNicknames = [];
  for (const commentData of props.commentDatasSendCommentModal.commentDatas) {
    const memberId = commentData.memberId;
    const getProfilePath = await memberGetProfileFetch<string>(`getProfileImg/${memberId}`);
    const getMemberNickname = await memberGetProfileFetch<string>(`getNickname/${memberId}`);
    getProfilePath ? getProfilePaths.push(getProfilePath) : DEFAULT_PROFILE_PATH;
    getMemberNicknames.push(getMemberNickname)
  }  
  return {
    getProfilePaths,
    getMemberNicknames,
  }
})
const emit = defineEmits(["comment-board-send", "comment-board-update", "comment-board-remove"]);

//댓글 버튼 눌렸을때
//내가 이걸 눌를때마다 boardId,,memberId,description만 전해주면됨
function commentSendClicked() {
  emit("comment-board-send", description.value);
  description.value = "";
  profilePaths.value.push(memberProfilePath.memberProfileImageURL);
  nicknames.value.push(memberNickname);
}

function handleUpdate(id: number, comment: string, memberId: number, boardId: number) {
  updateClicked.value = !updateClicked.value;
  commentUpdateModal.updateClicked = updateClicked.value;
  commentUpdateModal.id = id;
  commentUpdateModal.comment = comment;
  commentUpdateModal.boardId = boardId;
  commentUpdateModal.memberId = memberId;
}

function handleRemove(id: number, memberId: number, boardId: number) {
  removeClicked.value = !removeClicked.value;
  commentRemoveModal.removeClicked = removeClicked.value;
  commentRemoveModal.id = id;
  commentRemoveModal.boardId = boardId;
  commentRemoveModal.memberId = memberId;
}

//여기가 클릭됐다는것은 CommentUpdateModal에서 클릭이 왔다는것
function handleCommentUpdateClicked(commentUpdateModal: CommentUpdateModal) {
  updateClicked.value = !updateClicked.value;
  emit("comment-board-update", commentUpdateModal);
}

//여기가 클릭됐다는것은 CommentRemoveModal에서 클릭이 왔다는것
function handleCommentRemoveClicked(commentRemoveModal: CommentRemoveModal) {
  removeClicked.value = !removeClicked.value;
  emit("comment-board-remove", commentRemoveModal);
}
</script>

<style scoped></style>
