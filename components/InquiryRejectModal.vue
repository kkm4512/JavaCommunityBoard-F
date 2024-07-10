<template>
  <div v-if="props.inquiryData.switch" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-30"></div>
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-2xl">
      <!-- Modal content -->
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <input type="text" class="text-xl font-semibold text-gray-900 dark:text-white w-full" v-model="inquiryRejectData.title"> 제목 </input>
        <button
          @click="toggleModal()"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <textarea class="p-4 md:p-5 space-y-4 w-full text-black" v-model="inquiryRejectData.description">
        
      </textarea>
      <!-- Modal footer -->
      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-center">
        <button
          @click="toggleModal(true)"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          반려
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Status } from "~/types/inquiry";
import type { ResponseInquiry } from "~/types/responseInquiry";

const props = defineProps<{
  inquiryData: InquiryData;
}>();

interface InquiryData {
  completeInquiry: ResponseInquiry;
  switch: boolean;
}

export interface InquiryReject {
  title: string;
  description: string;
}

export interface InquiryRejectData {
  completeInquiry: ResponseInquiry,
  rejectInquiry: InquiryReject,
}

const inquiryRejectData = reactive<InquiryReject>({
  title: '',
  description: '',
})

const emitInquiryRejectData = reactive<InquiryRejectData>({
  completeInquiry: props.inquiryData.completeInquiry,
  rejectInquiry: inquiryRejectData,
})


const emit = defineEmits(["inquiry-reject-modal"])

function toggleModal(success?:boolean){
  emitInquiryRejectData.completeInquiry.status = Status.REJECTED
  if (success) emit("inquiry-reject-modal",emitInquiryRejectData)
  else emit("inquiry-reject-modal")
}
</script>

<style scoped>
</style>
