import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { LoginModule } from '@login/login.module';

describe('LoginService', () => {
  let service: LoginService;

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
