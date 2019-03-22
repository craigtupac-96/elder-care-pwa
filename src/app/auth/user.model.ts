export interface Roles {
  primary?: boolean;
  assistant?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
