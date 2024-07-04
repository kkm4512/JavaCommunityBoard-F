<template>
  <div
    class="flex-col justify-center items-center w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-5 mb-5"
  >
    <div class="bg-gray-300 rounded-xl p-3">
      <div class="flex justify-end mb-5" @click="handleRemove">
        <svg-icon type="mdi" :path="mdiIcons.close" class="text-black cursor-pointer"></svg-icon>
      </div>

      <div v-if="removeModalOpen" class="text-black">
        <BoardRemoveModal :removeModalOpen="removeModalOpen" @modalClicked="handleRemoveModalClicked"/>
      </div>

      <div class="text-black flex mb-2 w-1/2 rounded-xlh-10 items-center">
        <img :src="profileImagePath" class="w-10 h-10 rounded-full overflow-hidden border border-black" />
        <div class="ml-4">
          {{ props.shareBoard.nickname }}
        </div>
      </div>
      <h5 class="flex justify-center mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.shareBoard.title }}</h5>
      <div class="flex justify-between text-sm"></div>
      <div class="flex justify-center">
        <div v-if="props.shareBoard.boardImagePath" class="max-w-[50%] max-h-[50%]">
          <img :src="props.shareBoard.boardImagePath" />
        </div>
      </div>
      <p class="flex justify-center font-normal text-gray-700 dark:text-gray-400 mb-5 mt-5">{{ props.shareBoard.description }}</p>
      <div class="flex justify-between mt-5 text-sm"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_PROFILE_PATH } from "~/paths/pathConstatns";
import type { ResponseShareBoard } from "~/types/boards";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCloseBoxMultiple } from "@mdi/js";

//midIcon path
const mdiIcons = {
  close: mdiCloseBoxMultiple,
};

const props = defineProps<{
  shareBoard: ResponseShareBoard;
}>();

//현재 로그인 되어있는 사용자의 id와, 각 게시글에 저장되있는 memberId가 같은경우에만 update,remove버튼 보여주게하기
const showRemoveButton = ref<boolean>(true);

const profileImagePath = ref<string>(props.shareBoard.writerImagePath ? props.shareBoard.writerImagePath : DEFAULT_PROFILE_PATH);

//boardRemove 예정
function handleRemove() {
  removeModalOpen.value = !removeModalOpen.value;
}

const emit = defineEmits(["share-removeBoard"])

//BoardRemoveModal 에서 버튼이 눌러졌을때
//option이 있으면 확인 버튼을 눌렀다는 뜻이니 그때 api 호출하기
async function handleRemoveModalClicked(option?: string) {
  removeModalOpen.value = !removeModalOpen.value;
  if (option) {
    const res = await boardFetch<boolean>("/share/removeBoard", "DELETE", props.shareBoard);
    if (res) emit("share-removeBoard", props.shareBoard);
  }
}

//remove 버튼제어
const removeModalOpen = ref<boolean>(false);
</script>

<style scoped></style>
