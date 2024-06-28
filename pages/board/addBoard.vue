<template>
  <div class="flex justify-center">
    <BoardInputFileds />
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ["auth"],
});

</script>

<style scoped></style>
