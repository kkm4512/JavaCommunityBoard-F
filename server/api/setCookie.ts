import { defineEventHandler, setCookie } from "h3";

// 쿠키 생성
export default defineEventHandler(async (event: any) => {
  const queryKey: string = getQuery(event).queryKey as string;
  setCookie(event, "accessToken", queryKey, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  return true;
});