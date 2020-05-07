import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutesEnum } from 'src/app/app-routing.module';
import { StorageService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private storageService: StorageService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateLoggedIn(state);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateLoggedIn(state);
  }
  private validateLoggedIn(state: RouterStateSnapshot) {
    const isUserLoggedIn = this.storageService.isUserLoggedIn();
    return state.url.includes(RoutesEnum.LOGIN) ? !isUserLoggedIn : isUserLoggedIn;
  }
}
