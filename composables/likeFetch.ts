import type { Error } from "~/types/errorResponse";

export async function likeFetch(memberId:string | number,boardId:string | number): Promise<void> {
  const token = await getCookie();
  try {
    const response: boolean = await $fetch(`http://localhost:8080/like/${memberId}/${boardId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },      
    });
  } catch (e: unknown) {
    if (isFetchError(e)) {
      const errorResponse: Error = e;
      const allError = errorResponse.response._data.errors;
      for (const error in allError) {
        alert(allError[error]);
        break;
      }
    }
  }
}

function isFetchError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "response" in error && "_data" in (error as any).response;
}
