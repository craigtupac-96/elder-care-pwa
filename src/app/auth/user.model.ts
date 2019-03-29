import {AssistantRecord} from './lists.model';

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
  assistantRecords?: AssistantRecord[]; // must be array
  // if primary email exists add assistant contact details to primary user account
}
