import { AuthGuard } from './auth.guard';

export const sharedGuards = [AuthGuard];
export * from './auth.guard';
