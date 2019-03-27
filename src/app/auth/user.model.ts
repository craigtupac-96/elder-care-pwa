export interface Role {
  type: string;
}

export interface User {
  uid: string;
  email: string;
  primaryEmail?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  detailsComplete?: boolean;
  roles?: Role;
}
