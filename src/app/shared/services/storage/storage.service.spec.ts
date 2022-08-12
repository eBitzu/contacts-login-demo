import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { users } from 'src/app/app.component';
import { STORAGE_KEYS } from '@shared/models/session-storage';
import { fakeContact } from '@contacts/modals/dialog-contact/dialog-contact.component.spec';
import { contactFields } from '@shared/models/contacts';
import { ILoginData } from '@shared/models/login';

describe('StorageService', () => {
  let service: StorageService;
  const initUser: ILoginData =
  {
    email: users[0].email,
    pass: users[0].pass,
    token: null
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
    window.document.cookie = '';
  });

  afterEach(() => {
    window.document.cookie = '';
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getStorageByKey', () => {
    const storageSpy = spyOn(window.sessionStorage, 'getItem').and.callFake(() => JSON.stringify([initUser]));
    const returnVal = service.getStorageByKey(STORAGE_KEYS.USERS);
    expect(storageSpy).toHaveBeenCalledWith(STORAGE_KEYS.USERS);
    expect(returnVal).toEqual([initUser]);
  });

  it('should getStorageByKey - CONTACTS', () => {
    const storageSpy = spyOn(window.localStorage, 'getItem').and.callFake(() => JSON.stringify([fakeContact]));
    const returnVal = service.getStorageByKey(STORAGE_KEYS.CONTACTS);
    expect(storageSpy).toHaveBeenCalledWith(STORAGE_KEYS.CONTACTS);
    expect(returnVal).toEqual([fakeContact]);
  });

  it('should getStorageByKey - random', () => {
    const storageSpy = spyOn(window.localStorage, 'getItem');
    const returnVal = service.getStorageByKey(null);
    expect(storageSpy).not.toHaveBeenCalledWith(STORAGE_KEYS.CONTACTS);
    expect(returnVal).toEqual([]);
  });

  it('should getStorageByKey - failed', () => {
    const storageSpy = spyOn(window.localStorage, 'getItem').and.throwError('failed');
    const returnVal = service.getStorageByKey(STORAGE_KEYS.CONTACTS);
    expect(storageSpy).toHaveBeenCalledWith(STORAGE_KEYS.CONTACTS);
    expect(returnVal).toEqual([]);
  });

  it('should getStorageByKey - localStorage - empty', () => {
    const storageSpy = spyOn(window.localStorage, 'getItem').and.returnValue(null);
    const returnVal = service.getStorageByKey(STORAGE_KEYS.CONTACTS);
    expect(storageSpy).toHaveBeenCalledWith(STORAGE_KEYS.CONTACTS);
    expect(returnVal).toEqual([]);
  });

  it('should getStorageByKey - sessionStorage - empty', () => {
    const storageSpy = spyOn(window.sessionStorage, 'getItem').and.returnValue(null);
    const returnVal = service.getStorageByKey(STORAGE_KEYS.USERS);
    expect(storageSpy).toHaveBeenCalledWith(STORAGE_KEYS.USERS);
    expect(returnVal).toEqual([]);
  });

  it('should setUserCookie', () => {
    const spy = spyOn(service, 'getUserFromStorage').and.returnValue(initUser);
    spyOn(window.sessionStorage, 'getItem').and.callFake(() => JSON.stringify([initUser]));
    const storageSpy = spyOn(window.sessionStorage, 'setItem').and.callFake(() => {});
    service.setUserCookie(users[0].email);
    expect(spy).toHaveBeenCalledWith(users[0].email);
    expect(storageSpy).toHaveBeenCalledTimes(1);
    service.invalidateCurrentToken();
  });

  it('should invalidateCurrentToken', () => {
    spyOn(service, 'generateToken').and.returnValue('lalal');
    service.setUserCookie(initUser.email);
    const storageSpy = spyOn(window.sessionStorage, 'setItem').and.callThrough();
    spyOn(window.sessionStorage, 'getItem').and.returnValue(
      JSON.stringify([{...initUser, token: 'lalal'}])
    );
    service.invalidateCurrentToken();
    expect(document.cookie).toBe('');
    expect(storageSpy).toHaveBeenCalledTimes(1);
  });

  it('should invalidateCurrentToken - false', () => {
    const storageSpy = spyOn(window.sessionStorage, 'setItem').and.callFake(() => {});
    service.invalidateCurrentToken();
    expect(storageSpy).toHaveBeenCalledTimes(0);
  });

  it('should isUserLoggedIn - true', () => {
    spyOn(service, 'generateToken').and.returnValue('lalal');
    service.setUserCookie(initUser.email);
    spyOn(window.sessionStorage, 'getItem').and.returnValue(
      JSON.stringify([{...initUser, token: 'lalal'}])
    );

    expect(service.isUserLoggedIn()).toEqual(true);
    service.invalidateCurrentToken();
  });

  it('should isUserLoggedIn - false', () => {
    expect(service.isUserLoggedIn()).toEqual(false);
  });

  it('should storeContacts', () => {
    const storageSpy = spyOn(window.localStorage, 'setItem').and.callFake(() => {});
    service.storeContacts([fakeContact]);
    expect(storageSpy).toHaveBeenCalledWith(
      STORAGE_KEYS.CONTACTS, JSON.stringify([fakeContact])
    );
  });

  it('should updateContact - add - empty', () => {
    spyOn(service, 'getStorageByKey').and.returnValue([]);
    const spy = spyOn(service, 'storeContacts').and.callFake(() => {});
    service.updateContact(null, {...fakeContact, [contactFields.ID]: null});
    expect(spy).toHaveBeenCalledWith([{...fakeContact, [contactFields.ID]: 1}]);
  });

  it('should updateContact - add - elements', () => {
    spyOn(service, 'getStorageByKey').and.returnValue([fakeContact]);
    const spy = spyOn(service, 'storeContacts').and.callFake(() => {});
    service.updateContact(null, {...fakeContact, [contactFields.ID]: null});
    expect(spy).toHaveBeenCalledWith([fakeContact, {...fakeContact, [contactFields.ID]: 2}]);
  });

  it('should updateContact - edit - elements', () => {
    spyOn(service, 'getStorageByKey').and.returnValue([fakeContact]);
    const spy = spyOn(service, 'storeContacts').and.callFake(() => {});
    service.updateContact(fakeContact[contactFields.ID], {...fakeContact, [contactFields.FIRST_NAME]: 'random'});
    expect(spy).toHaveBeenCalledWith([{...fakeContact, [contactFields.FIRST_NAME]: 'random'}]);
  });

  it('should updateContact - remove - elements', () => {
    spyOn(service, 'getStorageByKey').and.returnValue([fakeContact]);
    const spy = spyOn(service, 'storeContacts').and.callFake(() => {});
    service.updateContact(fakeContact[contactFields.ID], null);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('should updateContact - remove - unfind', () => {
    spyOn(service, 'getStorageByKey').and.returnValue([fakeContact]);
    const spy = spyOn(service, 'storeContacts').and.callFake(() => {});
    service.updateContact(2, null);
    expect(spy).not.toHaveBeenCalledWith([]);
    expect(spy).toHaveBeenCalledWith([fakeContact]);
  });

  it('should getUserFromStorage', () => {
    spyOn(service, 'getStorageByKey').and.returnValue([initUser]);
    const val = service.getUserFromStorage(initUser[contactFields.EMAIL]);
    expect(val).toEqual(initUser);
  });
  it('should getUserFromStorage - empty', () => {
    spyOn(service, 'getStorageByKey').and.returnValue(null);
    const val = service.getUserFromStorage(initUser[contactFields.EMAIL]);
    expect(val).toBeUndefined();
  });
});
