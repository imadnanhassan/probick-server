
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
} as const;
export type TUserRole = keyof typeof UserRole;
