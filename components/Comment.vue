<template>
  <label for="chat" class="sr-only">Your message</label>
  <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700"></div>
  <div v-for="(commentData, i) of commentFormatCreatedDataList" :key="i">
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
        <div v-if="commentData.memberId === isAccessTokenDecoded?.id">
          <svg-icon
            @click="handleUpdate(commentData.id, commentData.comment, commentData.memberId, commentData.boardId)"
            type="mdi"
            :path="mdiIcons.update"
            class="text-black cursor-pointer w-5"
          ></svg-icon>
        </div>
        <div v-if="commentData.memberId === isAccessTokenDecoded?.id || commentDatasSendCommentModal.createMemberBoardId === isAccessTokenDecoded?.id">
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
import type { JwtMemberInfo } from "~/types/jwtMemberInfo";

//댓글 작성눌렀을때 반응형으로 만들어두려고 임시로 만듬
const memberProfilePath = useMemberProfileImageStore();
const useAccessToken = useAccessTokenStore();
const isAccessTokenDecoded = ref<JwtMemberInfo | null>(useAccessToken.accessToken ? JwtDecode(useAccessToken.accessToken) : null);
watchEffect(() => {
  isAccessTokenDecoded.value = useAccessToken.accessToken ? JwtDecode(useAccessToken.accessToken) : null;
});

//댓글 작성눌렀을떄 반응형으로 만들어두려고 임시로 만듬
const memberNickname = isAccessTokenDecoded.value?.nickname;

//midIcon path
const mdiIcons = {
  close: mdiCloseBoxMultiple,
  update: mdiUpdate,
};

//Board로부터 받은 데이터들
const props = defineProps<{
  commentDatasSendCommentModal: CommentDatasSendCommentModal;
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

//댓글 작성일 순서대로 정리한 데이터
const commentFormatCreatedDates: CommentsDatas[] = props.commentDatasSendCommentModal.commentDatas.sort((a, b) => {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
});
const commentFormatCreatedDataList: CommentsDatas[] = [];
if (commentFormatCreatedDates.length >= 5) {
  for (let i = 0; i < 5; i++) {
    commentFormatCreatedDataList.push(commentFormatCreatedDates[i]);
  }
} else {
  for (let i = 0; i < commentFormatCreatedDates.length; i++) {
    commentFormatCreatedDataList.push(commentFormatCreatedDates[i]);
  }
}

// for ( const comment of props.commentDatasSendCommentModal.commentDatas) {

// }

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

const { data: initData } = useAsyncData("initData", async () => {
  const getProfilePaths = [];
  const getMemberNicknames = [];
  for (const commentData of props.commentDatasSendCommentModal.commentDatas) {
    const memberId = commentData.memberId;
    const getProfilePath = await memberGetProfileFetch<string>(`getProfileImg/${memberId}`);
    const getMemberNickname = await memberGetProfileFetch<string>(`getNickname/${memberId}`);
    getProfilePath ? getProfilePaths.push(getProfilePath) : DEFAULT_PROFILE_PATH;
    getMemberNicknames.push(getMemberNickname);
  }
  return {
    getProfilePaths,
    getMemberNicknames,
  };
});
const emit = defineEmits(["comment-board-send", "comment-board-update", "comment-board-remove"]);

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
