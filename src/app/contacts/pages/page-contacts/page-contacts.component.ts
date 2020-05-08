import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { takeUntil, take, catchError } from 'rxjs/operators';
import { IContact, contactFields } from 'src/app/shared/models/contacts';

import { ContactsService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { DialogContactComponent } from '@contacts/modals';
import { DialogGenericDeleteComponent } from '@shared/modals';

@Component({
  selector: 'app-page-contacts',
  templateUrl: './page-contacts.component.html',
  styles: [],
})
export class PageContactsComponent implements OnInit, OnDestroy {
  constructor(
    private contactsService: ContactsService,
    private matDialog: MatDialog
  ) {}
  contacts: IContact[] = [];

  private unsubscribe = new Subject();
  private errorHandler = (er) => {
    console.error('[contacts-page]', er.message);
    return of(null);
  }

  ngOnInit(): void {
    this.listenForContacts();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  saveContact(contact: IContact = null) {
    const dialogRef = this.matDialog.open(DialogContactComponent, {
      width: '500px',
      data: contact
    });

    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe((c: IContact) => {
      if (!c) {
        return;
      }
      this.contactsService.saveContact(c).pipe(
        take(1),
        catchError(this.errorHandler)
      ).subscribe((r: boolean) => {
        alert(r ? 'User saved' : 'Unable to save user');
      });
    });
  }

  deleteContact(c: IContact) {
    const dialogRef = this.matDialog.open(DialogGenericDeleteComponent, {
      width: '400px',
      data: {
        title: 'Delete contact',
        text: `Are you sure you want to delete contact ${c[contactFields.EMAIL]}`
      }
    });

    dialogRef.afterClosed().pipe(
      take(1),
    ).subscribe((b: boolean) => {
      if (b) {
        this.contactsService.deleteContact(c[contactFields.ID]).pipe(
          take(1),
          catchError(this.errorHandler)
        ).subscribe((r: boolean) => {
          alert(r ? 'User deleted' : 'Failed to delete user');
        });
      }
    });
  }

  listenForContacts() {
    this.contactsService.getContacts().pipe(
      takeUntil(this.unsubscribe),
      catchError(this.errorHandler)
    ).subscribe((c) => {
      this.contacts = c || [];
    });
    this.contactsService.requestContacts();
  }
}
