import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services';
import { Observable, BehaviorSubject } from 'rxjs';
import { IContact } from 'src/app/shared/models/contacts';
import { SESSION_STORAGE_KEYS } from 'src/app/shared/models/session-storage';

@Injectable()
export class ContactsService {

  constructor(private storageService: StorageService) { }
  private contactsSubject = new BehaviorSubject<IContact[]>([]);


  requestContacts(): void {
    const contacts = this.storageService.getStorageByKey(SESSION_STORAGE_KEYS.CONTACTS) as IContact[];
    this.contactsSubject.next(contacts);
  }
  getContacts(): Observable<IContact[]>{
    return this.contactsSubject.asObservable();
  }
}
