import type { SignupUser } from '../types/index';

export const SIGNUP_FIELDS: (keyof SignupUser)[] = [
  'username',
  'firstName',
  'lastName',
  'password',
  'email',
  'phoneNumber',
] as const;
