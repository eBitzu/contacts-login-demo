import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageContactsComponent } from './pages';


const routes: Routes = [
  {
    path: '',
    component: PageContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
