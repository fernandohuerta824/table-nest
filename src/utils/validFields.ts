import type { SignupRequiredUser, SignupOptionalUser } from '../types/index';

export const SIGNUP_REQUIRED_FIELDS: (keyof SignupRequiredUser)[] = [
  'username',
  'firstName',
  'password',
] as const;


export const SIGNUP_OPTIONAL_FIELDS: (keyof SignupOptionalUser)[] = [
  'lastName',
  'email',
  'phoneNumber',
] as const;
