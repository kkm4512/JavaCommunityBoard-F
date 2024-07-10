import type { Error } from "~/types/errorResponse";

export default defineEventHandler(async (event) => {
  const query = getQuery<{ inquiryId: number }>(event);
  const inquiryId = query.inquiryId;
  const removedInquiryId = await inquiryCompleteDeleteFetch<number>(event, inquiryId);
  return removedInquiryId;
});

export async function inquiryCompleteDeleteFetch<T>(event: any, inquiryId: number): Promise<T | undefined> {
  const token = getCookie(event, "accessToken");
  try {
    const response: T = await $fetch(`/completeInquiry/delete/${inquiryId}`, {
      baseURL: `http://localhost:8081`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error: unknown) {
    if (typeof window === "undefined") {
      if (isFetchError(error)) {
        const errorResponse: Error = error;
        const allError = errorResponse.response._data.errors;
        if (typeof allError === "string") {
          return;
        }

        for (const error in allError) {
          break;
        }
      }
    }

    return undefined;
  }
}

function isFetchError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "response" in error && "_data" in (error as any).response;
}
