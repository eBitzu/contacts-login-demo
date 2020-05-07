import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards';

export enum RoutesEnum {
  LOGIN = 'login',
  CONTACTS = 'contacts'
}
export const routes: Routes = [{
    path: RoutesEnum.LOGIN,
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: RoutesEnum.CONTACTS,
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    canActivateChild: [AuthGuard]
  },
  { path: '', redirectTo: RoutesEnum.CONTACTS, pathMatch: 'full' },
  { path: '**', redirectTo: RoutesEnum.CONTACTS },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
