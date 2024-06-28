<template>
  <div v-if="removeModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-2xl">
      <!-- Modal content -->
      <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
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
       <div class="mb-5 flex justify-center">
          정말 삭제 하시겠습니까?
       </div>
      <!-- Modal footer -->
      <div class="flex items-center p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600 justify-center">
        <button
          @click="toggleModal('success')"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  removeModalOpen: boolean;
}>();

const emit = defineEmits(["modalClicked"])

function toggleModal(option?:string){
  if (option) emit("modalClicked",option);
  else emit("modalClicked");
  
}
</script>

<style scoped>
</style>
