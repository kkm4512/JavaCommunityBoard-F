import { jwtDecode } from "jwt-decode";
import type { JwtMemberInfo } from "~/types/jwtMemberInfo";

export function JwtDecode(accessToken:string):JwtMemberInfo{
  return jwtDecode(accessToken);
}