import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginData } from 'src/app/shared/models/login';
import { take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoutesEnum } from 'src/app/app-routing.module';
import { LoginService } from '../../services';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styles: [],
})
export class PageLoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    pass: this.fb.control('', [Validators.required, Validators.minLength(4)]),
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  submit() {
    const loginData: ILoginData = this.loginForm.value;
    this.loginService
      .checkLogin(loginData)
      .pipe(
        take(1),
        catchError((err) => {
          console.error(err);
          return of(false);
        })
      )
      .subscribe((valid: true) => {
        if (!valid) {
          alert('Login failed!');
          return;
        }
        this.router.navigate([RoutesEnum.CONTACTS]);
      });
  }
}
