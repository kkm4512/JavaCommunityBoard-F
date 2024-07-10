<template>
  <nav class="bg-slate-400 border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-xl" ref="navRef">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <nuxt-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CommunityBoard</span>
      </nuxt-link>

      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="md:block md:w-auto" id="navbar-dropdown">
        <ul
          class="flex items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-400 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-if="role === 'ROLE_ADMIN'">
            <nuxt-link
              to="/inquiry/1/getInquiry"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
              >GetInquiry</nuxt-link
            >
          </li>
          <li v-else-if="role === 'ROLE_USER'">
            <nuxt-link
              :to="`/inquiry/1/${loginMemberId}/email`"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
              >Email</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/board/addBoard"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
              >AddBoard</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="https://github.com/kkm4512/JavaCommunityBoard-F"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Github</nuxt-link
            >
          </li>
          <li v-if="role === 'ROLE_USER'">
            <nuxt-link
              to="/Inquiry"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Inquiry</nuxt-link
            >
          </li>
          <div class="py-1" v-if="isValidateAccessToken === true">
            <button
              @click="signOut"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Sign out
            </button>
          </div>
          <div class="py-1" v-if="isValidateAccessToken === false">
            <nuxt-link
              to="/signUp"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Sign Up</nuxt-link
            >
          </div>
          <div class="py-1" v-if="isValidateAccessToken === false">
            <nuxt-link
              to="/login"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >login</nuxt-link
            >
          </div>
          <li v-if="proFilePahts.profileImgPath">
            <nuxt-link
              :to="`/myPage/${loginMemberId}/1`"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              <div class="w-10 h-10 rounded-full overflow-hidden border border-black">
                <img :src="proFilePahts.profileImgPath" class="w-full h-full object-cover" />
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
//내가 몇번쨰 페이지를 클릭했는지를 header에서 어캐알게하지?
import { ref, onMounted, onBeforeUnmount } from "vue";
import { DEFAULT_PROFILE_PATH } from "~/paths/pathConstatns";

const isValidateAccessToken = ref<boolean>(false);
const loginMemberId = ref<number | null>(null);



const useValidateAccessToken = useValidateAccessTokenStore();
const useAccessToken = useAccessTokenStore();
const useMemberProfileImage = useMemberProfileImageStore();

const isOpen = ref<boolean>(false);
const navRef = ref<HTMLElement | null>(null);
const role = ref<string | null>("");

//프로필 이미지 경로들
const proFilePahts = ref<{ profileImgPath: string; memberProfilePath: string; defaultProfilePath: string }>({
  //회원가입할떄 이미지 안넣었으면, 디폴트 이미지로 변경시키기 위한 변수
  profileImgPath: "",

  //회원가입할떄 넣은 이미지 경로
  memberProfilePath: "",

  //기본 프로필 이미지
  defaultProfilePath: DEFAULT_PROFILE_PATH,
});

watchEffect(() => {
  isValidateAccessToken.value = useValidateAccessToken.validateAccessToken;
  proFilePahts.value.memberProfilePath = useMemberProfileImage.memberProfileImageURL;

  //로그인여부로 결정할까?
  if (useAccessToken.accessToken) {
    loginMemberId.value = JwtDecode(useAccessToken.accessToken).id;
    proFilePahts.value.profileImgPath = proFilePahts.value.memberProfilePath ? proFilePahts.value.memberProfilePath : proFilePahts.value.defaultProfilePath;
    role.value = JwtDecode(useAccessToken.accessToken).role;
  } else {
    role.value = "";
  }
});

function dropDownButton() {
  isOpen.value = !isOpen.value;
}

function signOut() {
  removeCookie();
  isValidateAccessToken.value = !isValidateAccessToken.value;
  useValidateAccessToken.validateAccessToken = !useValidateAccessToken.validateAccessToken;
  useAccessToken.accessToken = "";
  useMemberProfileImage.memberProfileImageURL = "";
  proFilePahts.value.profileImgPath = "";
}

function handleClickOutside(event: MouseEvent) {
  if (navRef.value && !navRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>
