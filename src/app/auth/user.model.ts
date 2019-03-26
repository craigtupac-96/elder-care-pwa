export interface Roles {
  primary?: boolean;
  assistant?: boolean;
}

export interface User {
  uid: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  detailsComplete?: boolean;
  // roles: Roles;
}
