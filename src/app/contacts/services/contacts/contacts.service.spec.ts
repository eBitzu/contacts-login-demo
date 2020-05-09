import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { ContactsModule } from '@contacts/contacts.module';
import { StorageService } from '@shared/services';
import { fakeContact } from '@contacts/modals/dialog-contact/dialog-contact.component.spec';
import { contactFields } from '@shared/models/contacts';

import { cold } from 'jasmine-marbles';


describe('ContactsService', () => {
  let service: ContactsService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsService],
      imports: [ContactsModule]
    });
    service = TestBed.inject(ContactsService);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should saveContact', () => {
    const ssSpy = spyOn(storageService, 'updateContact').and.callFake(() => null);
    const sSpy = spyOn(service, 'requestContacts').and.callFake(() => null);
    const resp$ = service.saveContact(fakeContact);

    expect(ssSpy).toHaveBeenCalledWith(fakeContact[contactFields.ID], fakeContact);
    expect(sSpy).toHaveBeenCalledTimes(1);

    const exp$ = cold('(b|)', {b: true});
    expect(resp$).toBeObservable(exp$);
  });
  it('should saveContact - reject', () => {
    const ssSpy = spyOn(storageService, 'updateContact').and.throwError('break');
    const sSpy = spyOn(service, 'requestContacts').and.callFake(() => null);
    const resp$ = service.saveContact(fakeContact);

    expect(ssSpy).toHaveBeenCalledWith(fakeContact[contactFields.ID], fakeContact);
    expect(sSpy).toHaveBeenCalledTimes(0);

    const exp$ = cold('#', null, {message : 'Save request failed'});
    expect(resp$).toBeObservable(exp$);
  });

  it('should deleteContact', () => {
    const ssSpy = spyOn(storageService, 'updateContact').and.callFake(() => null);
    const sSpy = spyOn(service, 'requestContacts').and.callFake(() => null);
    const resp$ = service.deleteContact(fakeContact[contactFields.ID]);

    expect(ssSpy).toHaveBeenCalledWith(fakeContact[contactFields.ID], null);
    expect(sSpy).toHaveBeenCalledTimes(1);

    const exp$ = cold('(b|)', {b: true});
    expect(resp$).toBeObservable(exp$);
  });
  it('should deleteContact - reject', () => {
    const ssSpy = spyOn(storageService, 'updateContact').and.throwError('break');
    const sSpy = spyOn(service, 'requestContacts').and.callFake(() => null);
    const resp$ = service.deleteContact(fakeContact[contactFields.ID]);

    expect(ssSpy).toHaveBeenCalledWith(fakeContact[contactFields.ID], null);
    expect(sSpy).toHaveBeenCalledTimes(0);

    const exp$ = cold('#', null, {message : 'Delete request failed'});
    expect(resp$).toBeObservable(exp$);
  });

});
