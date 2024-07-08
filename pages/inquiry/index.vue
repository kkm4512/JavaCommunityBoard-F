<template>
  <div class="text-white mt-5">
    <Inquiry @inquiry-component="handleInquriy"/>
  </div>
</template>

<script setup lang="ts">
import type { Inquiry } from '~/types/inquiry';


async function handleInquriy(inquiry:Inquiry){
  console.log(inquiry)
  const formData = new FormData();
  formData.append(
    "inquirySaveDTO",
    new Blob([
      JSON.stringify({
        title: inquiry.title,
        description: inquiry.description,
        category: inquiry.category,
        memberId: inquiry.memberId,
      })
    ], { type: "application/json" } )
  )
  if (inquiry.file) formData.append("saveInquiryImage",inquiry.file);
  await inquiryFetch(formData);
  alert("문의가 정상적으로 등록 되었습니다")
  navigateTo("/")
}

</script>

<style scoped>

</style>