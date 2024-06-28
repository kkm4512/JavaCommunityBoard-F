<template>
  <div v-if="updateModal.updateModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-2xl">
      <!-- Modal content -->
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <input type="text" v-model="updateBoard.title" class="text-xl font-semibold text-gray-900 dark:text-white w-full" :placeholder="updateModal.title"></input>
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
      <textarea v-model="updateBoard.description" class="p-4 md:p-5 space-y-4 w-full" :placeholder="updateModal.description">
        
      </textarea>
      <!-- Modal footer -->
      <div class="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          @click="toggleModal('update')"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          수정
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Board } from '~/types/boards';
import type { UpdateModal } from '~/types/updateModal';

const updateBoard = reactive<Board>({
  title: "",
  description: "",
})

const emit = defineEmits(["modalClicked"])

  /**
   * - 만약 수정버튼이 눌렸다면
   * - -  부모 컴포넌트로 title,descritopn,isModalVisible 3개를 건내주고
   * - 다른 버튼이 눌러졌다면
   * - -  부모 컴포넌트로 아무것도 안건네주기
   */

function toggleModal(option?:string) {
  if (option) {
    updateBoard.title;
    updateBoard.description;
    emit("modalClicked",updateBoard);
  } else {
    emit("modalClicked");
  }

}

const props = defineProps<{
  updateModal: UpdateModal;
}>();
</script>

<style scoped>
</style>
