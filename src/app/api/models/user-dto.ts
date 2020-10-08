/* tslint:disable */
import { UserRole } from './user-role';
export interface UserDto {
  roles?: Array<UserRole>;
  username?: string;
}
