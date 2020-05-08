import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { contactsPages } from './pages';
import { SharedModule } from '../shared/shared.module';
import { contactsServices } from './services';
import { contactsComponents } from './components';
import { contactsDialogs } from './modals';


@NgModule({
  declarations: [...contactsPages, ...contactsComponents, ...contactsDialogs],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ],
  providers: [...contactsServices],
  entryComponents: [...contactsDialogs]
})
export class ContactsModule { }
