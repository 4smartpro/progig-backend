import { UserRole } from '@app/common';

export interface FindUserParams {
  searchText?: string;
  limit?: number;
  page?: number;
  userId?: string;
  role?: UserRole;
}
