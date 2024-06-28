export async function setCookie(token: string) {
  const cookie = await $fetch("/api/setCookie", {
    baseURL: "http://localhost:3000",
    method: "GET",
    query: {
      queryKey: token,
    },
  });
}

export async function getCookie(): Promise<string> {
  const cookie = await $fetch("/api/getCookie", {
    baseURL: "http://localhost:3000",
    method: "GET",
  });
  return cookie
}

export async function removeCookie(): Promise<boolean> {
  const cookie = await $fetch("/api/removeCookie", {
    baseURL: "http://localhost:3000",
    method: "GET",
  });
  return true;
}

