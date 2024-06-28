import type { Error } from "~/types/errorResponse";

export async function isVerifyAccessTokenFetch(): Promise<boolean> {
  try {
    const token = await getCookie();
    const response: boolean = await $fetch(`http://localhost:8080/accessToken/verify`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (e: unknown) {
    if (isFetchError(e)) {
      const errorResponse: Error = e;
      const allError = errorResponse.response._data.errors;
      for (const error in allError) {
        alert(allError[error]);
        break;
      }
    }
    return false;
  }
}

function isFetchError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "response" in error && "_data" in (error as any).response;
}
