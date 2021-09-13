export class AuthUser {
  id: string;
  loginId: string;
  firstName: string;
  lastName: string;
  modules: string;
  features: string;
  permissions: string;
  jwtToken?: string;
  isSuperUser?: boolean;
}
