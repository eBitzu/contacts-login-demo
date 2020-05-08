import { Injectable } from '@angular/core';
import { ILoginData } from '../../models/login';
import { of, Observable, throwError } from 'rxjs';
import { STORAGE_KEYS } from '../../models/session-storage';
import { StorageService } from '../storage/storage.service';

import sha512 from '@cryptography/sha512';

@Injectable()
export class SharedAuthService {

  constructor(private storageService: StorageService) { }
  validateCredentials(cred: ILoginData): Observable<any> {
    const storageUser = this.storageService.getUserFromStorage(cred.email);
    if (!storageUser) {
      this.storageService.invalidateCurrentToken();
      return throwError({message: 'User not found'});
    }
    if (storageUser.pass !== btoa(sha512(cred.pass))) {
      this.storageService.invalidateCurrentToken();
      return throwError({message: 'Invalid password'});
    }
    this.storageService.setUserCookie(cred.email);
    return of(true);
  }
}
