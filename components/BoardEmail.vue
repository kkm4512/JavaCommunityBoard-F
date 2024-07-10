<template>
  <div v-if="removeInquiryToggle">
    <InquiryRemove :inquiryRemoveModal="inquiryRemoveModal" @inquiry-remove-modal="handleInquiryRemoveModal" />
  </div>
  <div v-if="removeInquirySelectedToggle">
    <InquiryRemoveSelected :switch="removeInquirySelectedToggle" @inquiry-remove-selected-modal="handleInquiryRemoveSelectedModal" />
  </div>
  <div v-if="rejectModal">
    <InquiryRejectionRason :reject-data="rejectData" :swtich="rejectModal" @reject-button-click="handleRejectButtonClicked"/>
  </div>
  <div class="relative overflow-x-auto rounded-xl">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"><input type="checkbox" v-model="mainCheckBox" @click="mainCheckBoxChange" /></th>
          <th scope="col" class="px-6 py-3">제목</th>
          <th scope="col" class="px-6 py-3">본문</th>
          <th scope="col" class="px-6 py-3">문의일자</th>
          <th scope="col" class="px-6 py-3">처리여부</th>
          <th scope="col" class="px-6 py-3">삭제</th>
        </tr>
      </thead>
      <tbody v-for="(responseCompleteInquiry, i) of responseCompleteInquiries" :key="responseCompleteInquiry.inquiryId">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4"><input type="checkbox" v-model="selectedData[i]" @click="selectedDataChange(i)" /></td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ responseCompleteInquiry.title }}</th>
          <td class="px-6 py-4">{{ responseCompleteInquiry.description }}</td>
          <td class="px-6 py-4">{{ formatDate(responseCompleteInquiry.createdAt) }}</td>
          <td class="px-6 py-4" v-if="statusKorea[responseCompleteInquiry.status] !== '처리반려'">{{ statusKorea[responseCompleteInquiry.status] }}</td>
          <button @click="rejectionReason(responseCompleteInquiry.rejectInquiryDTO.title,responseCompleteInquiry.rejectInquiryDTO.description)" class="px-6 py-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" v-else="statusKorea[responseCompleteInquiry.status] === '처리반려'">{{ statusKorea[responseCompleteInquiry.status] }}사유</button>
          <td class="px-6 py-4 cursor-pointer" @click="removeInquiryModal(responseCompleteInquiry.inquiryId)">
            <svg-icon type="mdi" :path="mdiAlphaXBoxOutline"></svg-icon>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-end mt-5">
      <button
        @click="removeInquirySelectedModal"
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        일괄삭제
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAlphaXBoxOutline } from "@mdi/js";
import type { ResponseCompleteInquiry } from "~/types/inquiry";
import type { InquiryRemoveModal } from "./InquiryRemove.vue";
import type { RejectData } from "./InquiryRejectionRason.vue";

const props = defineProps<{
  responseCompleteInquiries: ResponseCompleteInquiry[];
}>();

const statusKorea = {
  IN_PROCESS: "처리중",
  FULFILLED: "처리완료",
  REJECTED: "처리반려",
}
//선택항목박스들
const selectedData = ref<boolean[]>(props.responseCompleteInquiries.map((e) => false));

const mainCheckBox = ref<boolean>(false);

const rejectModal = ref<boolean>(false);

const rejectData = reactive<RejectData>({
  title: "",
  description: "",
})

//선택항목 변경
function selectedDataChange(i: number) {
  selectedData.value[i] = !selectedData.value[i];
}

function mainCheckBoxChange() {
  mainCheckBox.value = !mainCheckBox.value;
  selectedData.value = selectedData.value.map((_) => mainCheckBox.value);
}


function rejectionReason(title:string,description:string){
  rejectModal.value = !rejectModal.value
  rejectData.title = title;
  rejectData.description = description;
}

//문의글 삭제 클릭 여부
const removeInquiryToggle = ref<boolean>(false);
//문의글 일괄삭제 클릭 여부
const removeInquirySelectedToggle = ref<boolean>(false);

//문의글 inquiryRemoveModal로 보낼 데이터들
const inquiryRemoveModal = reactive<InquiryRemoveModal>({
  inquiryId: 0,
  switch: removeInquiryToggle.value,
});

//문의글 삭제 클릭했을때
function removeInquiryModal(inquiryId: number) {
  removeInquiryToggle.value = !removeInquiryToggle.value;
  inquiryRemoveModal.inquiryId = inquiryId;
  inquiryRemoveModal.switch = removeInquiryToggle.value;
}

//문의글 일괄삭제 클릭 했을떄
function removeInquirySelectedModal() {
  removeInquirySelectedToggle.value = !removeInquirySelectedToggle.value;
}

//inquiryRemoveModal에서 버튼 눌렀을때
function handleInquiryRemoveModal(inquiryId: number) {
  removeInquiryToggle.value = !removeInquiryToggle.value;
  if (inquiryId) emit("remove-inquiry", inquiryId);
}

//inquiryRemoveSelectedModal에서 버튼 눌렀을때
function handleInquiryRemoveSelectedModal(option: boolean) {
  removeInquirySelectedToggle.value = !removeInquirySelectedToggle.value;
  const filterdCompleteInquiries:ResponseCompleteInquiry[] = [];
  selectedData.value.forEach((select, i) => {
    if (select) {
      filterdCompleteInquiries.push(props.responseCompleteInquiries[i])
    }
  });
  if (option) emit("remove-inquiry-selected", filterdCompleteInquiries);
  selectedData.value = selectedData.value.map((_) => false);
}

function handleRejectButtonClicked(){
  rejectModal.value = !rejectModal.value
}


const emit = defineEmits(["remove-inquiry", "remove-inquiry-selected"]);
</script>

<style scoped></style>
