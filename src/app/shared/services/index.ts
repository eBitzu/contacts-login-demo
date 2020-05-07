import { SharedAuthService } from './auth/shared-auth.service';
import { StorageService } from './storage/storage.service';

export const sharedServices = [SharedAuthService, StorageService];
export * from './auth/shared-auth.service';
export * from './storage/storage.service';
