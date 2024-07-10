<template>
  <div v-for="inquiry of inquiries" :key="inquiry.inquiryId" class="flex justify-center mt-5 text-center">
    <div v-if="inquiryRejectSwitch">
      <InquiryRejectModal :inquiryData="inquiryRejectData" @inquiry-reject-modal="handleInquiryRejectModal"/>
    </div>
    <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-[50%]">
      <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-start">유형: {{ inquiry.category }}</p>
      <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">{{ inquiry.title }}</h5>
      <div class="flex justify-center mb-5">
        <img :src="inquiry.filePath" class="max-w-[50%] min-w-[50%]" />
      </div>
      <p class="font-normal text-gray-700 dark:text-gray-400">{{ inquiry.description }}</p>
      <div class="flex justify-between">
        <button
          @click="check(inquiry.inquiryId)"
          type="button"
          class="text-white bg-blue-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-10"
        >
          확인
        </button>
        <!-- 반려 눌렀을떄 반려할떄, 반려 이유 작성 할 수 있는 컴포넌트 나오게 하면 좋을 뜻 -->
        <button
          @click="inquiryRejectButton(inquiry)"
          type="button"
          class="text-white bg-red-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-10"
        >
          반려
        </button>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <InquiryPageNavigate :datas="datas" />
  </div>
</template>

<script setup lang="ts">
import type { InquiryRejectData } from "~/components/InquiryRejectModal.vue";
import { Status } from "~/types/inquiry";
import type { ResponseInquiry } from "~/types/responseInquiry";
const route = useRoute();
const inquiries = ref<ResponseInquiry[]>([]);
const page = parseInt(route.params.page as string);
const inquiryRejectSwitch = ref<boolean>(false);

const datas = reactive({
  totalPages: 0,
  curPage: page,
});

onMounted(async () => {
  const responseInquiries = await inquiryGetAllFetch<ResponseInquiry[]>();
  if (responseInquiries) {
    datas.totalPages = responseInquiries?.length;
  }
  const responseInquiriesGetSizes = await inquiryGetSizeFetch<ResponseInquiry[]>(page);
  if (responseInquiriesGetSizes)
    for (const responseInquiriesGetSize of responseInquiriesGetSizes) {
      inquiries.value?.push(responseInquiriesGetSize);
    }
    console.log(responseInquiriesGetSizes)
});

async function check(inquiryId: number) {
  //여기서 확인버튼이 눌릴떄 둘다 각각 없애고,저장
  const updated = await inquiryCompleteUpdateFetch<boolean>(inquiryId);
  if (updated) await inquiryDeleteFetch<void>(inquiryId);

  inquiries.value = inquiries.value.filter((inquity) => inquity.inquiryId !== inquiryId);
  datas.totalPages--;
}

const defaultInquiry: ResponseInquiry = {
  id: 0,
  inquiryId: 0,
  title: '',
  description: '',
  category: '',
  memberId: 0,
  createdAt: new Date(),
  filePath: '',
  status: Status.IN_PROCESS,
};

const inquiryRejectData = reactive<{completeInquiry:ResponseInquiry,switch: boolean}>({
  completeInquiry: defaultInquiry,
  switch: false,
})

//getInquiry에서 반려버튼 클릭
function inquiryRejectButton(completeInquiry:ResponseInquiry){
  inquiryRejectSwitch.value = !inquiryRejectSwitch.value
  inquiryRejectData.completeInquiry = completeInquiry;
  inquiryRejectData.switch = inquiryRejectSwitch.value
}

//inquiryRejectModal로부터 버튼이 눌려졌을떄
async function handleInquiryRejectModal(inquiryRejectData:InquiryRejectData){
  inquiryRejectSwitch.value = !inquiryRejectSwitch.value
  await inquiryRejectUpdateFetch<boolean>(inquiryRejectData.completeInquiry.inquiryId);
  await inquiryRejectSaveFetch<boolean>(inquiryRejectData)
  await inquiryDeleteFetch<void>(inquiryRejectData.completeInquiry.inquiryId);
  //여기서 반려처리가 눌러졌을떄 completed에도 REJECTED로 바꿔줘야하네
  inquiries.value = inquiries.value.filter((inquity) => inquity.inquiryId !== inquiryRejectData.completeInquiry.inquiryId);
  datas.totalPages--;
}
</script>

<style scoped></style>
