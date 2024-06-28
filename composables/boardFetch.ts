import type { HttpMethod } from "~/types/httpMethod";
import type { Error } from "~/types/errorResponse";

export async function boardFetch<T>(url: string, methods?: HttpMethod, data?: {}): Promise<T | undefined> {
  try {
    const token = await getCookie();
    const response: T = await $fetch(url, {
      baseURL: `http://localhost:8080/board`,
      method: methods,
      body: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (e: unknown) {
    if (isFetchError(e)) {
      const errorResponse: Error = e;
      const allError = errorResponse.response._data.errors;
      if (typeof(allError) === "string") {
        alert(allError)
        return;
      }
      
      for (const error in allError) {
        alert(allError[error]);
        break;
      }
    }

    return undefined;
  }
}

export async function boardGetAllFetch<T>(url: string): Promise<T | undefined> {
  try {
    const response: T = await $fetch(url, {
      baseURL: `http://localhost:8080/board`,
      method: "GET",
    });
    return response;
  } catch (e: unknown) {
    if (isFetchError(e)) {
      const errorResponse: Error = e;
      const allError = errorResponse.response._data.errors;
      if (typeof(allError) === "string") {
        alert(allError)
        return;
      }
      
      for (const error in allError) {
        alert(allError[error]);
        break;
      }
    }

    return undefined;
  }
}

function isFetchError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "response" in error && "_data" in (error as any).response;
}
