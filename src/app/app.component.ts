import { Component, OnInit } from '@angular/core';
import { STORAGE_KEYS } from './shared/models/session-storage';
import { ILoginData, INavPaths } from './shared/models/login';
import { routes } from './app-routing.module';
import { StorageService } from './shared/services';
import { RoutesEnum } from './shared/models/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {}
  get links(): INavPaths[] {
    return [...routes]
    .filter((v) => !['', '**'].includes(v.path))
    .map((v) => ({ path: v.path, visible: v.path.includes(RoutesEnum.LOGIN) ? !this.isLoggedIn : this.isLoggedIn}));
  }
  ngOnInit() {
    const localStorage = sessionStorage.getItem(STORAGE_KEYS.USERS);
    if (!localStorage) {
      // Dummy account data
      const users: ILoginData[] = [
        {
          email: 'lala@lala.com',
          pass: '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', // 1234
        },
        {
          email: 'me@user.com',
          pass: 'W3IrMH/ObJRJBdEyaR1eSiIUt/6StziSDrP846kEIKGVEcMBCg53ErBU2u9bV7rVnsvZOzKA8hBXj1R/Su1NJQ==', // pass
        },
      ];
      sessionStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }
  logout() {
    this.storageService.invalidateCurrentToken();
    this.router.navigate([RoutesEnum.LOGIN]);
  }
  get isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
}
