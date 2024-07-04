<template>
  <!-- Modal toggle -->
  <div v-if="props.shareBoard.isShared" class="flex h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
    <div class="fixed inset-0 bg-black opacity-50"></div>

    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 flex-col flex p-3">
        <!-- Modal header -->
        <button
          @click="toggleClicked()"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="default-modal"
        >
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">해당 내용을 공유 하시겠습니까?</p>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            @click="toggleClicked(true)"
            data-modal-hide="default-modal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            공유하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShareBoard } from "~/types/boards";

function toggleClicked(option?:boolean){
  if (option) emit("ShareModal", props.shareBoard.board);
  else emit("ShareModal");
}

const emit = defineEmits(["ShareModal"])

const props = defineProps<{
  shareBoard: ShareBoard;
}>();
</script>

<style scoped></style>
