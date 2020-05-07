import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IContact } from 'src/app/shared/models/contacts';

import { ContactsService } from '../../services';

@Component({
  selector: 'app-page-contacts',
  templateUrl: './page-contacts.component.html',
  styles: [],
})
export class PageContactsComponent implements OnInit, OnDestroy {
  contacts: IContact[] = [];

  private unsubscribe = new Subject();
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.listenForContacts();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  listenForContacts() {
    this.contactsService.requestContacts();
    this.contactsService.getContacts().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((c) => {
      this.contacts = c;
    });
  }
}
