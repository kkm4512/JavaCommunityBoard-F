import type { HttpMethod } from "~/types/httpMethod";
import type { Error } from "~/types/errorResponse";

export async function memberFetch<T>(url: string, methods?: HttpMethod, data?: {}): Promise<T | undefined> {
  try {
    const response: T = await $fetch(url, {
      baseURL: `http://localhost:8080/`,
      method: methods,
      body: data,
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
    return undefined;
  }
}

export async function memberGetProfileFetch<T>(url: string, methods?: HttpMethod, data?: {}): Promise<T | undefined> {
  try {
    const response: T = await $fetch(url, {
      baseURL: `http://localhost:8080/`,
      method: methods,
      body: data,
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
    return undefined;
  }
}

function isFetchError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "response" in error && "_data" in (error as any).response;
}
