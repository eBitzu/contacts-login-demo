import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { StorageService } from '@shared/services';
import { RoutesEnum } from '@shared/models/routes';
import { RouterStateSnapshot, Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [SharedModule, RouterTestingModule.withRoutes(routes)]
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should pass canActivate', () => {
    const spy = spyOn(service, 'isUserLoggedIn').and.returnValue(true);
    const val = guard.canActivate(null, {url: RoutesEnum.CONTACTS} as RouterStateSnapshot);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(val).toBe(true);
  });

  it('should pass canActivateChild', () => {
    const spy = spyOn(service, 'isUserLoggedIn').and.returnValue(false);
    const sSpy = spyOn(router, 'navigate').and.callFake(() => Promise.resolve(true));
    guard.canActivateChild(null, {url: RoutesEnum.CONTACTS} as RouterStateSnapshot);
    expect(sSpy).toHaveBeenCalledWith([RoutesEnum.LOGIN]);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should pass canActivateChild 2', () => {
    const spy = spyOn(service, 'isUserLoggedIn').and.returnValue(true);
    const val = guard.canActivateChild(null, {url: RoutesEnum.LOGIN} as RouterStateSnapshot);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(val).toBe(false);
  });
});
