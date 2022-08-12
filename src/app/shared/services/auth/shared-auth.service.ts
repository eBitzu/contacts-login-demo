import { Injectable } from '@angular/core';
import { ILoginData } from '../../models/login';
import { of, Observable, throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';

import sha512 from '@cryptography/sha512';

@Injectable()
export class SharedAuthService {
  constructor(private storageService: StorageService) { }

  validateCredentials(cred: ILoginData): Observable<any> {
    const storageUser = this.storageService.getUserFromStorage(cred.email);
    if (!storageUser) {
      this.storageService.invalidateCurrentToken();
      return throwError(() => of({message: 'User not found'}));
    }
    const fromSha = btoa(sha512(cred.pass, 'binary'));
    if (storageUser.pass !== fromSha) {
      this.storageService.invalidateCurrentToken();
      return throwError(() => of({message: 'Invalid password'}));
    }
    this.storageService.setUserCookie(cred.email);
    return of(true);
  }
}
