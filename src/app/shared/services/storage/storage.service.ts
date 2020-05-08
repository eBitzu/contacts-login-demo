import { Injectable } from '@angular/core';
import { makeId } from '../../utils/generators';
import { ILoginData } from '../../models/login';
import { IContact } from '../../models/contacts';
import { SESSION_STORAGE_KEYS } from '../../models/session-storage';

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
      SESSION_STORAGE_KEYS.USERS
    ) as ILoginData[];
    const storageUser = data.find((f) => f.email === email);
    if (user.token) {
      storageUser.token = user.token;
      sessionStorage.setItem(SESSION_STORAGE_KEYS.USERS, JSON.stringify(data));
    }
  }

  invalidateCurrentToken() {
    const user = this.getUserByToken();
    user.token = null;
    this.removeCookie();
    this.updateUserStorage(user.email, user);
  }

  isUserLoggedIn(): boolean {
    return !!this.getUserByToken();
  }

  public getStorageByKey(
    what: SESSION_STORAGE_KEYS
  ): ILoginData[] | IContact[] {
    try {
      switch (what) {
        case SESSION_STORAGE_KEYS.USERS:
          const storedData = sessionStorage.getItem(what);
          return (JSON.parse(storedData) as ILoginData[]) || [];
        case SESSION_STORAGE_KEYS.CONTACTS:
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
    const data = this.getStorageByKey(SESSION_STORAGE_KEYS.USERS) as ILoginData[] || [];
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
        SESSION_STORAGE_KEYS.USERS
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
      (this.getStorageByKey(SESSION_STORAGE_KEYS.CONTACTS) as IContact[]) || [];
    if (!id) {
      const newId = !!contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      contacts = [...contacts, {...data, id: newId}];
    } else {
      const found = contacts.findIndex((user) => user.id === id);
      if (found > -1) {
        contacts.splice(found, 1, data);
      }
    }
    this.storeContacts(contacts);
  }
  storeContacts(contacts: IContact[]) {
    localStorage.setItem(SESSION_STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }
}
