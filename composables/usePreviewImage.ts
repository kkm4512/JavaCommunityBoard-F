/**
 * 파일 미리보기
 */
export function usePreviewImage(file: Ref<File | null>) {
  const imageUrl = ref<string | null>(null);

  watch(file, (newFile) => {
    if (typeof window !== "undefined" && newFile) {
      const reader = new FileReader();
      if (newFile) {
        reader.onload = function (e) {
          e.target && typeof e.target.result === "string" ? (imageUrl.value = e.target.result) : null;
        };
      }
      if (newFile) {
        reader.readAsDataURL(newFile);
      }
    }
  });
  return {
    imageUrl,
  };
}
