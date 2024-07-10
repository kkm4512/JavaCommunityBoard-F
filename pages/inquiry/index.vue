<template>
  <div class="text-white mt-5">
    <Inquiry @inquiry-component="handleInquriy"/>
  </div>
</template>

<script setup lang="ts">
import type { Inquiry } from '~/types/inquiry';


async function handleInquriy(inquiry:Inquiry){
  const formData = new FormData();
  formData.append(
    "inquirySaveDTO",
    new Blob([
      JSON.stringify({
        title: inquiry.title,
        description: inquiry.description,
        category: inquiry.category,
        memberId: inquiry.memberId,
        status: "IN_PROCESS",
      })
    ], { type: "application/json" } )
  )
  if (inquiry.file) formData.append("saveInquiryImage",inquiry.file);
  const saveNunber = await inquiryFetch<number>(formData);
  if (saveNunber) await inquiryCompleteFetch<boolean>(saveNunber);
  alert("문의가 정상적으로 등록 되었습니다")
  navigateTo("/")
}

definePageMeta({
  middleware: ["auth"],
});

</script>

<style scoped>

</style>