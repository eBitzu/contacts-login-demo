import { Injectable } from '@angular/core';
import { makeId } from '../../utils/generators';
import { ILoginData } from '../../models/login';
import { IContact } from '../../models/contacts';
import { SESSION_STORAGE_KEYS } from '../../models/session-storage';

@Injectable()
export class StorageService {
  setUserCookie(mail: string) {
    const user: ILoginData = this.getFromStorage(
      mail,
      SESSION_STORAGE_KEYS.USERS
    ) as ILoginData;
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
    const storedData = sessionStorage.getItem(what);
    try {
      switch (what) {
        case SESSION_STORAGE_KEYS.USERS:
          return (JSON.parse(storedData) as ILoginData[]) || [];
        case SESSION_STORAGE_KEYS.CONTACTS:
          return (JSON.parse(storedData) as IContact[]) || [];
        default:
          return [];
      }
    } catch (e) {
      return [];
    }
  }

  getFromStorage(email: string, what: SESSION_STORAGE_KEYS) {
    const data: any[] = this.getStorageByKey(what) || [];
    const findFn = (u: IContact | ILoginData) => u.email === email;
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
  updateContacts(email: string, data: IContact) {
    let users =
      (this.getStorageByKey(SESSION_STORAGE_KEYS.CONTACTS) as IContact[]) || [];
    if (!email) {
      users = [...users, data];
    } else {
      const found = users.findIndex((user) => user.email === email);
      if (found > -1) {
        users.splice(found, 1, data);
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
  }
}
