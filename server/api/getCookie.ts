import cookie from "cookie";
export default defineEventHandler((e: any) => {
  const req = e.req;
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  return accessToken
});