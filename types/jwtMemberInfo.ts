export interface JwtMemberInfo {
  id: number;
  name: string;
  role: Role;
  nickname: string;
  iat: number;
  exp: number;
}

export enum Role {
  ROLE_ADMIN =  "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER"
}