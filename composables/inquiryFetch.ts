import type { InquiryRejectData } from "~/components/InquiryRejectModal.vue";
import type { Error } from "~/types/errorResponse";

export async function inquiryFetch<T>(formData:FormData): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/inquiry/save`, {
      baseURL: `http://localhost:8081`,
      method: "POST",
      body: formData,
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

export async function inquiryGetAllFetch<T>(): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/inquiry/getAll`, {
      baseURL: `http://localhost:8081`,
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

export async function inquiryGetSizeFetch<T>(pageNumber:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/pageNavigate/getAllInquires/${pageNumber}`, {
      baseURL: `http://localhost:8081/board`,
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

export async function inquiryDeleteFetch<T>(id:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/inquiry/delete/${id}`, {
      baseURL: `http://localhost:8081`,
      method: "DELETE",
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

export async function inquiryCompleteFetch<T>(inquiryId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/completeInquiry/save/${inquiryId}`, {
      baseURL: `http://localhost:8081`,
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

export async function completeInquiryGetAllByMemberIdFetch<T>(inquiryId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/completeInquiry/getAll/${inquiryId}`, {
      baseURL: `http://localhost:8081`,
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

export async function inquiryCompleteUpdateFetch<T>(inquiryId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/completeInquiry/update/complete/${inquiryId}`, {
      baseURL: `http://localhost:8081`,
      method: "PUT",
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

export async function inquiryRejectUpdateFetch<T>(inquiryId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/completeInquiry/update/reject/${inquiryId}`, {
      baseURL: `http://localhost:8081`,
      method: "PUT",
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

export async function inquiryCompleteGetByPageAndMemberIdFetch<T>(pageNumber:number,memberId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/board/pageNavigate/inquiryComplete/${pageNumber}/${memberId}`, {
      baseURL: `http://localhost:8081`,
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

export async function inquiryCompleteDeleteFetch<T>(inquiryId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/completeInquiry/delete/${inquiryId}`, {
      baseURL: `http://localhost:8081`,
      method: "DELETE",
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

export async function inquiryCompleteDeleteFetches<T>(inquiryIds:number[]): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/completeInquiry/deletes`, {
      baseURL: `http://localhost:8081`,
      method: "DELETE",
      body: inquiryIds,
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


export async function inquiryRejectSaveFetch<T>(inquiryRejectData:InquiryRejectData): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/rejectInquiry/save`, {
      baseURL: `http://localhost:8081`,
      method: "POST",
      body: inquiryRejectData,
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

function isFetchError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "response" in error && "_data" in (error as any).response;
}