import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { takeUntil, take, catchError } from 'rxjs/operators';
import { IContact } from 'src/app/shared/models/contacts';

import { ContactsService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { DialogContactComponent } from '@contacts/modals';

@Component({
  selector: 'app-page-contacts',
  templateUrl: './page-contacts.component.html',
  styles: [],
})
export class PageContactsComponent implements OnInit, OnDestroy {
  contacts: IContact[] = [];

  private unsubscribe = new Subject();
  constructor(
    private contactsService: ContactsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listenForContacts();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addNewContact() {
    const dialogRef = this.matDialog.open(DialogContactComponent, {
      width: '500px',
      data: null
    });
    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe((c: IContact) => {
      if (!c) {
        return;
      }
      this.contactsService.saveContact(c).pipe(
        take(1),
        catchError((er) => {
          console.error(er.message);
          return of(false);
        })
      ).subscribe((r: boolean) => {
        alert(r ? 'User saved' : 'Unable to save user');
      });
    });
  }

  listenForContacts() {
    this.contactsService.getContacts().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((c) => {
      this.contacts = c;
    });
    this.contactsService.requestContacts();
  }
}
