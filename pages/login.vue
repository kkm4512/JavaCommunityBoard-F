<template>
  <div class="flex flex-col justify-center items-center border-2 border-gray-300 h-screen rounded-xl mt-5 bg-slate-300">
    <div class="border-2 border-gray-500 rounded-lg h-1/2 w-1/2 bg-white flex flex-col justify-center items-center">
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
      <button
        @click="signIn"
        type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const userInfo = ref({
  name: "",
  password: "",
});

const useAccessToken = useAccessTokenStore();
const useMemberProfileImage = useMemberProfileImageStore();

async function signIn() {
  const accessToken = await memberFetch<string>("login", "POST", userInfo.value);

  
  if (accessToken) {
    await setCookie(accessToken);
    useAccessToken.updateAccessToken(accessToken);
    const memberId = JwtDecode(accessToken).id;

    //img 받아올 api요청
    const getMemberProfileImageURL = await memberGetProfileFetch<string>(`/getProfileImg/${memberId}`, "GET");
    if (getMemberProfileImageURL) useMemberProfileImage.updateMemberProfileImage(getMemberProfileImageURL);
    
    alert("로그인 성공");
    navigateTo("/");
  }
}
</script>

<style scoped></style>
