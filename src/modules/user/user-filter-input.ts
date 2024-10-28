export interface UserFilterInput {
  customerId?: number;
  username?: string;
  email?: string;
  password?: string;
  createdAtFrom?: Date;
  createdAtTo?: Date;
}
