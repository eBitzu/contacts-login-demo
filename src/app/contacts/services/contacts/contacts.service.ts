import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { IContact, contactFields } from 'src/app/shared/models/contacts';
import { STORAGE_KEYS } from 'src/app/shared/models/session-storage';

@Injectable()
export class ContactsService {

  constructor(private storageService: StorageService) { }
  private contactsSubject = new BehaviorSubject<IContact[]>([]);

  saveContact(c: IContact) {
    // simulate api obs
    try {
      this.storageService.updateContact(c[contactFields.ID], c);
      this.requestContacts();
      return of(true);
    } catch (er) {
      return throwError({message: 'Save request failed'});
    }
  }

  deleteContact(id: number) {
    // simulate api obs
    try {
      this.storageService.updateContact(id, null);
      this.requestContacts();
      return of(true);
    } catch (er) {
      return throwError({message: 'Delete request failed'});
    }
  }

  requestContacts(): void {
    const contacts = this.storageService.getStorageByKey(STORAGE_KEYS.CONTACTS) as IContact[];
    this.contactsSubject.next(contacts);
  }
  getContacts(): Observable<IContact[]>{
    return this.contactsSubject.asObservable();
  }
}
