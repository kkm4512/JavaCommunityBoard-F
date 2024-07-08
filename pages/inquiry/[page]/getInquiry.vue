<template>
  <div v-for="inquiry of inquiries" :key="inquiry.id" class="flex justify-center mt-5 text-center">
    <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-[50%]">
      <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-start">유형: {{ inquiry.category }}</p>
      <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">{{ inquiry.title }}</h5>
      <div class="flex justify-center mb-5">
        <img :src="inquiry.filePath" class="max-w-[50%] min-w-[50%]" />
      </div>
      <p class="font-normal text-gray-700 dark:text-gray-400">{{ inquiry.description }}</p>
      <button
        @click="check(inquiry.id)"
        type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-10"
      >
        확인
      </button>
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <InquiryPageNavigate :datas="datas" />
  </div>
</template>

<script setup lang="ts">
import type { ResponseInquiry } from "~/types/responseInquiry";
const route = useRoute();
const inquiries = ref<ResponseInquiry[]>([]);
const page = parseInt(route.params.page as string);

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
});

async function check (id:number){
  await inquiryCompleteFetch(id);
  await inquiryDeleteFetch<void>(id)
  inquiries.value = inquiries.value.filter( inquity => inquity.id !== id )
  datas.totalPages--;
  
}

</script>

<style scoped></style>
