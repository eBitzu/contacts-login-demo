import { Component, OnInit } from '@angular/core';
import { SESSION_STORAGE_KEYS } from './shared/models/session-storage';
import { ILoginData, INavPaths } from './shared/models/login';
import { routes, RoutesEnum } from './app-routing.module';
import { StorageService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storageService: StorageService) {}
  links: INavPaths[];
  ngOnInit() {
    this.links = [...routes]
      .filter((v) => !['', '**'].includes(v.path))
      .map((v) => ({ path: v.path, isDisabled: v.path.includes(RoutesEnum.LOGIN) ? this.isLoggedIn : !this.isLoggedIn}));
    const localStorage = sessionStorage.getItem(SESSION_STORAGE_KEYS.USERS);
    if (!localStorage) {
      // Dummy account data
      const users: ILoginData[] = [
        {
          email: 'lala@lala.com',
          pass: '1234',
        },
        {
          email: 'me@user.com',
          pass: 'pass',
        },
      ];
      sessionStorage.setItem(SESSION_STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }
  logout() {
    this.storageService.invalidateCurrentToken();
  }
  get isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
}
