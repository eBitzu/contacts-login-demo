import { Injectable } from '@angular/core';
import { ILoginData } from '../../models/login';
import { of, Observable, throwError } from 'rxjs';
import { SESSION_STORAGE_KEYS } from '../../models/session-storage';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class SharedAuthService {

  constructor(private storageService: StorageService) { }
  validateCredentials(cred: ILoginData): Observable<any> {
    const storageUser = this.storageService.getFromStorage(cred.email, SESSION_STORAGE_KEYS.USERS) as ILoginData;
    if (!storageUser) {
      this.storageService.invalidateCurrentToken();
      return throwError({message: 'User not found'});
    }
    if (storageUser.pass !== cred.pass) {
      this.storageService.invalidateCurrentToken();
      return throwError({message: 'Invalid password'});
    }
    this.storageService.setUserCookie(cred.email);
    return of(true);
  }
}
