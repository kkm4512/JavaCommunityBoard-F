<template>
  <div class="text-white mt-5" v-if="responseCompleteInquiries">
    <BoardEmail :responseCompleteInquiries="responseCompleteInquiries" @remove-inquiry="handleRemoveInquiry" @remove-inquiry-selected="handleRemoveSelectedInquiry"/>
    <div class="mt-5 flex justify-center">
      <EmailPageNavigate :pageDatas="pageDatas" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResponseCompleteInquiry } from "~/types/inquiry";
const responseCompleteInquiries = ref<ResponseCompleteInquiry[]>();


definePageMeta({
  middleware: ["auth"],
});

const route = useRoute()
const curPage = parseInt(route.params.page as string);
const useAccessToken = useAccessTokenStore();
const loginMyId = ref<number | null>(useAccessToken.accessToken ? JwtDecode(useAccessToken.accessToken).id : null);

const pageDatas = reactive({
  totalPage: 0,
  curPage: curPage
})

onMounted(async () => {
  const completedInquriesPage = await completeInquiryGetAllByMemberIdFetch<ResponseCompleteInquiry[]>(loginMyId.value ? loginMyId.value : 0);
  const completedInquries = await inquiryCompleteGetByPageAndMemberIdFetch<ResponseCompleteInquiry[]>(curPage,loginMyId.value ? loginMyId.value : 0);
  responseCompleteInquiries.value = completedInquries;
  if (completedInquriesPage) pageDatas.totalPage = completedInquriesPage?.length;
});


//동일하게 했을떄 백엔드는 안되나? 당장실험해보자 ㄱㄱㄱ
async function handleRemoveInquiry (inquiryId:number){
  const deleteInquiryId = await inquiryCompleteDeleteFetch(inquiryId);
  responseCompleteInquiries.value = responseCompleteInquiries.value?.filter( responseCompleteInquiry =>  responseCompleteInquiry.inquiryId !== deleteInquiryId);
}

async function handleRemoveSelectedInquiry (completeInquiries:ResponseCompleteInquiry[]){
  const inquiryIds:number[] = completeInquiries.map( e => e.inquiryId );
  await inquiryCompleteDeleteFetches(inquiryIds)
  responseCompleteInquiries.value = responseCompleteInquiries.value?.filter( e => !inquiryIds.includes(e.inquiryId));
}
</script>
<style scoped></style>
