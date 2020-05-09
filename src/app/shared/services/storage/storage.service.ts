import { Injectable } from '@angular/core';
import { makeId } from '../../utils/generators';
import { ILoginData } from '../../models/login';
import { IContact, contactFields } from '../../models/contacts';
import { STORAGE_KEYS } from '../../models/session-storage';

@Injectable()
export class StorageService {
  setUserCookie(mail: string) {
    const user: ILoginData = this.getUserFromStorage(
      mail,
    );
    user.token = makeId();
    this.removeCookie();
    document.cookie = `SESSIONID=${user.token}; expires=${new Date(
      new Date().getTime() + 30 * 60 * 1000
    ).toUTCString()}; path=/;`;
    this.updateUserStorage(mail, user);
  }
  private updateUserStorage(email: string, user: ILoginData) {
    const data = this.getStorageByKey(
      STORAGE_KEYS.USERS
    ) as ILoginData[];
    const storageUser = data.find((f) => f.email === email);
    if (user.token) {
      storageUser.token = user.token;
      sessionStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data));
    }
  }

  invalidateCurrentToken() {
    const user = this.getUserByToken();
    if (!user) {
      return;
    }
    user.token = null;
    this.removeCookie();
    this.updateUserStorage(user.email, user);
  }

  isUserLoggedIn(): boolean {
    return !!this.getUserByToken();
  }

  public getStorageByKey(
    what: STORAGE_KEYS
  ): ILoginData[] | IContact[] {
    try {
      switch (what) {
        case STORAGE_KEYS.USERS:
          const storedData = sessionStorage.getItem(what);
          return (JSON.parse(storedData) as ILoginData[]) || [];
        case STORAGE_KEYS.CONTACTS:
          const storedContacts = localStorage.getItem(what);
          return (JSON.parse(storedContacts) as IContact[]) || [];
        default:
          return [];
      }
    } catch (e) {
      return [];
    }
  }

  getUserFromStorage(email: string): ILoginData {
    const data = this.getStorageByKey(STORAGE_KEYS.USERS) as ILoginData[] || [];
    const findFn = (u: ILoginData) => u.email === email;
    return data.find(findFn);
  }

  private removeCookie = () => {
    document.cookie =
      'SESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  private getUserByToken(): ILoginData {
    const currentCookies = document.cookie.split('; ');
    const existingCookieToken = currentCookies.find((cookieString) =>
      cookieString.includes('SESSIONID')
    );
    if (existingCookieToken) {
      const users = this.getStorageByKey(
        STORAGE_KEYS.USERS
      ) as ILoginData[];
      const token = existingCookieToken.split('=').pop();
      const tokenUser = users.find(
        (user) => !!user.token && user.token === token
      );
      return tokenUser;
    }
    return null;
  }
  updateContact(id: number, data: IContact) {
    let contacts =
      (this.getStorageByKey(STORAGE_KEYS.CONTACTS) as IContact[]) || [];
    if (id == null) {
      const newId = !!contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      contacts = [...contacts, {...data, [contactFields.ID]: newId}];
    } else {
      const foundIndex = contacts.findIndex((user) => user[contactFields.ID] === id);
      if (foundIndex > -1) {
        if (data) {
          contacts.splice(foundIndex, 1, data);
        } else {
          contacts.splice(foundIndex, 1);
        }
      }
    }
    this.storeContacts(contacts);
  }
  storeContacts(contacts: IContact[]) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }
}
