import { UserRole } from '../entities/user-role.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
}
