import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { loginPages } from './pages';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { loginServices } from './services';

@NgModule({
  declarations: [...loginPages],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
  ],
  providers: [...loginServices],
})
export class LoginModule { }
