/***
 * 1. 근데 이것도 백엔드로 해당 cookie(토큰)을 날려봐서
 * 2. 만료기한이 지나지않았는지, 유효한지 확인을 해봐야할거같은데 그치? 
 * 3. ㅇㅇ
 */

export default defineNuxtRouteMiddleware(async(to, from) => {
  const isValidateAccessToken = await isVerifyAccessTokenFetch();
  if (!isValidateAccessToken) {
    alert("접근 권한이 없습니다")
    return navigateTo("/")
  }
})