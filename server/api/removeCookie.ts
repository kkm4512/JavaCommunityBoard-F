export default defineEventHandler(e => {
  const cookieName = "accessToken";
  setCookie(e,cookieName,"",{
    maxAge: -1,
    path: "/"
  })
  return true;
});