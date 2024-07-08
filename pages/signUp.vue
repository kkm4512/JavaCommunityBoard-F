<template>
  <div class="flex flex-col justify-center items-center border-2 border-gray-300 h-screen rounded-xl mt-5 bg-slate-300 border-">
    <div class="border-2 border-gray-500 rounded-lg h-[85%] w-1/2 bg-white flex flex-col justify-center items-center">
      <div class="text-black border-2 mt-5">
        {{ selectedIcon }}
      </div>
      <div class="flex justify-between w-1/2 mb-5 text-black">
        <svg-icon
          type="mdi"
          :path="midIconPaths.admin"
          :class="['w-10', 'h-10', 'cursor-pointer', { 'text-red-500': selectedIcon === 'ROLE_ADMIN', 'text-black': selectedIcon !== 'ROLE_ADMIN' }]"
          @click="clickedIcon('ROLE_ADMIN')"
        ></svg-icon>
        <svg-icon
          type="mdi"
          :path="midIconPaths.user"
          :class="['w-10', 'h-10', 'cursor-pointer', { 'text-red-500': selectedIcon === 'ROLE_USER', 'text-black': selectedIcon !== 'ROLE_USER' }]"
          @click="clickedIcon('ROLE_USER')"
        ></svg-icon>
      </div>
      <div class="mb-6 w-1/2">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
        <input
          v-model="userInfo.name"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-6 w-1/2">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
        <input
          v-model="userInfo.password"
          type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-6 w-1/2">
        <label for="nickname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">nickname</label>
        <input
          v-model="userInfo.nickname"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-6 w-1/2" v-if="selectedIcon === 'ROLE_ADMIN'">
        <label for="Admin_Password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin_Password</label>
        <input
          v-model="adminPasswordCheck"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div class="flex items-center justify-center w-full mb-5">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-1/2 h-25 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <div v-if="!imageUrl">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
            </div>
            <div v-else class="max-w-[60%] max-h-[50%]">
              <img :src="imageUrl" />
            </div>
            <p class="text-gray-500 dark:text-gray-400 font-semibold text-lg"><span>Your Profile Img</span></p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
        </label>
      </div>

      <button
        @click="signUp"
        type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiShieldCrown } from "@mdi/js";
import { mdiAccount } from "@mdi/js";

const selectedIcon = ref<string | null>(null);
const { file, handleFileUpload } = useFileUpload();
const { imageUrl } = usePreviewImage(file);

const midIconPaths = ref({
  admin: mdiShieldCrown,
  user: mdiAccount,
});

const adminPasswordCheck = ref<string>("");
const adminPasswordKey = "대한민국";
const userInfo = reactive({
  name: "",
  password: "",
  nickname: "",
  role: "",
});

async function signUp() {
  if (selectedIcon.value === "ROLE_ADMIN") {
    if (adminPasswordCheck.value !== adminPasswordKey) {
      alert("관리자 패스워드가 일치하지 않습니다");
      return;
    }
  } else {
    const formData = new FormData();
    formData.append(
      "userInfo",
      new Blob(
        [
          JSON.stringify({
            name: userInfo.name,
            password: userInfo.password,
            nickname: userInfo.nickname,
            role: userInfo.role,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (file.value) {
      formData.append("profileImg", file.value);
    }
    const res = await memberFetch("signUp", "POST", formData);
    if (res) {
      alert("회원가입 성공");
      navigateTo("/");
    }
  }
}

function clickedIcon(role: string) {
  selectedIcon.value = role;
  userInfo.role = role;
}
</script>

<style scoped></style>
