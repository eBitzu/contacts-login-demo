import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { contactsPages } from './pages';
import { SharedModule } from '../shared/shared.module';
import { contactsServices } from './services';
import { contactsComponents } from './components';


@NgModule({
  declarations: [...contactsPages, ...contactsComponents],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ],
  providers: [...contactsServices]
})
export class ContactsModule { }
