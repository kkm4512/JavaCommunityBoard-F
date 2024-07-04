
/**
 * 파일 업로드
 */
export function useFileUpload() {
  const file = ref<File | null>(null);

  function handleFileUpload(e: Event) {
    const t = e.target as HTMLInputElement;
    t.files && t.files.length > 0 ? file.value = t.files[0] : null;
  }
  return {
    file,
    handleFileUpload,
  };
};
