<template>
  <div class="flex flex-col justify-center items-center border-2 border-gray-300 h-full rounded-xl mt-5 bg-slate-300 p-10">
    <h1 class="text-black text-lg h-[15%]">건의사항</h1>
    <div class="border-2 border-gray-500 rounded-lg h-1/2 w-1/2 bg-white flex flex-col justify-center items-center p-10">
      <div class="mb-6 w-full">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">title</label>
        <input
          v-model="userInfo.title"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-6 w-full">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description</label>
        <textarea
          v-model="userInfo.description"
          type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="w-full">
        <select
          v-model="userInfo.category"
          id="countries"
          default="선택항목"
          class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">선택항목</option>
          <option value="Error">오류사항</option>
          <option value="Fix">개선사항</option>
          <option value="Good">칭찬사항</option>
          <option value="Other">그 외</option>
        </select>
      </div>
      <div v-if="!file">
        <div class="block text-sm font-medium text-gray-900 dark:text-white cursor-pointer mb-5" @click="triggerFileInput" >
          <svg-icon type="mdi" :path="mdiFileDocumentPlusOutline"></svg-icon>
        </div>
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
      </div>
      <div v-else class="mb-5">
        <img :src="imageUrl ? imageUrl : ''" />
      </div>
      <button
        @click="send"
        type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFileDocumentPlusOutline } from "@mdi/js";
const useAcessToken = useAccessTokenStore();
const fileInput = ref<HTMLInputElement | null>(null);
const { file, handleFileUpload } = useFileUpload();
const { imageUrl } = usePreviewImage(file);

const userInfo = reactive({
  title: "",
  description: "",
  category: "",
  memberId: 0,
  file: null as File | null,
});

const emit = defineEmits(["inquiry-component"]);

function send() {
  userInfo.memberId = JwtDecode(useAcessToken.accessToken).id;
  userInfo.file = file.value;
  if (userInfo.category === "") {
    alert("선택항목을 골라주세요");
    return;
  }
  emit("inquiry-component", userInfo);
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}
</script>

<style scoped></style>
