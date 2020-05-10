import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { LoginModule } from '@login/login.module';
import { SharedAuthService } from '@shared/services';
import { users } from 'src/app/app.component';
import { cold } from 'jasmine-marbles';

describe('LoginService', () => {
  let service: LoginService;
  let sharedAuth: SharedAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService
      ],
      imports: [
        LoginModule
      ]
    });
    service = TestBed.inject(LoginService);
    sharedAuth = TestBed.inject(SharedAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should checkLogin', () => {
    spyOn(window.sessionStorage, 'getItem').and.returnValue(JSON.stringify(users));
    const spy = spyOn(sharedAuth, 'validateCredentials').and.callThrough();
    const isValid$ = service.checkLogin({
      email: users[0].email,
      pass: '1234'
    });
    expect(spy).toHaveBeenCalledWith({
      email: users[0].email,
      pass: '1234'
    });
    const exp$ = cold('(a|)', {a: true});
    expect(isValid$).toBeObservable(exp$);
  });

  it('should checkLogin - false', () => {
    spyOn(window.sessionStorage, 'getItem').and.returnValue(JSON.stringify(users));
    const spy = spyOn(sharedAuth, 'validateCredentials').and.callThrough();
    const isValid$ = service.checkLogin({
      email: users[0].email,
      pass: '12345'
    });
    expect(spy).toHaveBeenCalledWith({
      email: users[0].email,
      pass: '12345'
    });
    const exp$ = cold('#', null, { message: 'Invalid password' });
    expect(isValid$).toBeObservable(exp$);
  });
});
