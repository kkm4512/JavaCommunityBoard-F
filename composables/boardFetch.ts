import type { HttpMethod } from "~/types/httpMethod";
import type { Error } from "~/types/errorResponse";

export async function boardFetch<T>(url: string, methods?: HttpMethod, data?: {}): Promise<T | undefined> {
  try {
    const token = await getCookie();
    const response: T = await $fetch(url, {
      baseURL: `http://localhost:8081/board`,
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
      baseURL: `http://localhost:8081/board`,
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

export async function boardGetImageByIdFetch<T>(url: string): Promise<T | undefined> {
  try {
    const response: T = await $fetch(url, {
      baseURL: `http://localhost:8081/board`,
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

export async function boardGetAllById<T>(url: string): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(url, {
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

export async function boardGetSizeByPage<T>(pageNumber: number | string): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/pageNavigate/${pageNumber}`, {
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

export async function boardGetSizeByPageAndMemberId<T>(pageNumber: number | string,memberId: number | string): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/pageNavigate/${pageNumber}/${memberId}`, {
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

export async function boardGetSizeByPageAndLoginMemberId<T>(pageNumber: number | string, loginMemberId: string | number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/pageNavigate/${pageNumber}/${loginMemberId}`, {
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

export async function shareBoardGetSizeByPageAndLoginMemberId<T>(pageNumber: number | string, loginMemberId: string | number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/pageNavigate/share/${pageNumber}/${loginMemberId}`, {
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

export async function allBoardGetSizeByPageAndLoginMemberId<T>(pageNumber: number | string, loginMemberId: string | number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/pageNavigate/allBoards/${pageNumber}/${loginMemberId}`, {
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

export async function getBoardByBoardId<T>(boardId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/`, {
      baseURL: `http://localhost:8081/board/getBoard/${boardId}`,
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

export async function inquiryFetch<T>(boardId:number): Promise<T | undefined> {
  const token = await getCookie();
  try {
    const response: T = await $fetch(`/`, {
      baseURL: `http://localhost:8081/board/getBoard/${boardId}`,
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



function isFetchError(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "response" in error && "_data" in (error as any).response;
}
