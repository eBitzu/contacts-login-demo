import { Injectable } from '@angular/core';
import { ILoginData } from 'src/app/shared/models/login';
import { SharedAuthService } from 'src/app/shared/services';

@Injectable()
export class LoginService {
  constructor(private sharedAuthService: SharedAuthService) { }
  /**
   * This function uses a shared auth method that can be later replaced
   *
   * @param credentials : login credentials
   */
  checkLogin(credentials: ILoginData) {
    return this.sharedAuthService.validateCredentials(credentials);
  }
}
