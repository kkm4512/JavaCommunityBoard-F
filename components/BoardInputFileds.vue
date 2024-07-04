<template>
  <div class="w-full h-screen mt-[5%]">
    <div class="flex flex-col h-full">
      <div class="relative w-full min-w-[200px] h-10">
        <input
          v-model="board.title"
          class="peer w-full h-full bg-transparent text-blue-gray-300 font-sans font-normal outline outline-1 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-300"
          placeholder=""
        /><label
          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-300 peer-focus:text-gray-300 before:border-blue-gray-200 peer-focus:before:!border-gray-300 after:border-blue-gray-200 peer-focus:after:!border-gray-300"
          >title
        </label>
      </div>
      <div class="relative w-full min-w-[200px] h-1/2 mt-5">
        <textarea
          v-model="board.description"
          class="peer w-full h-full bg-transparent text-blue-gray-300 font-sans font-normal outline outline-1 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-300"
          placeholder=" "
        /><label
          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-300 peer-focus:text-gray-300 before:border-blue-gray-200 peer-focus:before:!border-gray-300 after:border-blue-gray-200 peer-focus:after:!border-gray-300"
          >description
        </label>
      </div>
      <div>
        <div class="border-2 border-white rounded-lg mt-5 flex justify-center cursor-pointer h-9 items-center" @click="triggerFileInput">
          <div v-if="!file">
            <svg-icon type="mdi" :path="path"> </svg-icon>
          </div>
          <div v-else>
            {{ file.name }}
          </div>
        </div>
        <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
      </div>
      <div class="flex justify-center mt-5">
        <button
          @click="createBoard"
          class="relative mt-5 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 border-2 border-black"
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"> Create </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFileDocumentPlusOutline } from "@mdi/js";
const accessToken = await getCookie();
const memberId = JwtDecode(accessToken).id;
const nickname = JwtDecode(accessToken).nickname;
const router = useRouter();
const path = ref(mdiFileDocumentPlusOutline);
const useBoardImage = useBoardImageStore();


const fileInput = ref<HTMLInputElement | null>(null);

const { file, handleFileUpload } = useFileUpload();

const board = reactive({
  memberId: memberId,
  title: "",
  description: "",
  nickname: nickname,
});

async function createBoard() {
  const formData = new FormData();
  formData.append(
    "boardInfo",
    new Blob([JSON.stringify({
      memberId: board.memberId,
      title: board.title,
      description: board.description,
      nickname: board.nickname,
    })],{type: "application/json"})
  );
  if (file.value) formData.append("boardImage",file.value);
  const res = await boardFetch<boolean>("/save", "POST", formData);
  if (res) {
    alert("정상적으로 생성 되었습니다");
    router.push("/");
  }
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
