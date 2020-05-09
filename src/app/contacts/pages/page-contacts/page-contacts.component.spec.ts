import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContactsComponent } from './page-contacts.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { ContactsModule } from '@contacts/contacts.module';
import { ContactsService } from '@contacts/services';
import { fakeContact } from '@contacts/modals/dialog-contact/dialog-contact.component.spec';
import { contactFields } from '@shared/models/contacts';

describe('PageContactsComponent', () => {
  let component: PageContactsComponent;
  let fixture: ComponentFixture<PageContactsComponent>;
  let dialog: MatDialog;
  let service: ContactsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContactsComponent ],
      imports: [
        ContactsModule
      ],
    })
    .compileComponents();
    dialog = TestBed.inject(MatDialog);
    service = TestBed.inject(ContactsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should saveContact', () => {
    const dSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(null)
    } as MatDialogRef<any>);
    component.saveContact(null);

    expect(dSpy).toHaveBeenCalled();
  });
  it('should saveContact2', () => {
    const cSpy = spyOn(window.console, 'error').and.callFake(() => null);
    const aSpy = spyOn(window, 'alert').and.callFake(() => null);
    const csSpy = spyOn(service, 'saveContact').and.returnValue(throwError({message: 'reject'}));
    const dSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(fakeContact)
    } as MatDialogRef<any>);
    component.saveContact();

    expect(dSpy).toHaveBeenCalled();
    expect(cSpy).toHaveBeenCalledWith('[contacts-page]', 'reject');
    expect(aSpy).toHaveBeenCalledWith('Unable to save user');
    expect(csSpy).toHaveBeenCalledWith(fakeContact);
  });
  it('should saveContact3', () => {
    const aSpy = spyOn(window, 'alert').and.callFake(() => null);
    const csSpy = spyOn(service, 'saveContact').and.returnValue(of(true));
    const dSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(fakeContact)
    } as MatDialogRef<any>);
    component.saveContact(fakeContact);

    expect(dSpy).toHaveBeenCalled();
    expect(aSpy).toHaveBeenCalledWith('User saved');
    expect(csSpy).toHaveBeenCalledWith(fakeContact);
  });

  it('should deleteContact', () => {
    const dSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(false)
    } as MatDialogRef<any>);
    component.deleteContact(fakeContact);

    expect(dSpy).toHaveBeenCalled();
  });

  it('should deleteContact2', () => {
    const cSpy = spyOn(window.console, 'error').and.callFake(() => null);
    const aSpy = spyOn(window, 'alert').and.callFake(() => null);
    const csSpy = spyOn(service, 'deleteContact').and.returnValue(throwError({message: 'reject'}));
    const dSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(fakeContact)
    } as MatDialogRef<any>);
    component.deleteContact(fakeContact);

    expect(dSpy).toHaveBeenCalled();
    expect(cSpy).toHaveBeenCalledWith('[contacts-page]', 'reject');
    expect(aSpy).toHaveBeenCalledWith('Failed to delete user');
    expect(csSpy).toHaveBeenCalledWith(fakeContact[contactFields.ID]);
  });

  it('should deleteContact3', () => {
    const aSpy = spyOn(window, 'alert').and.callFake(() => null);
    const csSpy = spyOn(service, 'deleteContact').and.returnValue(of(true));
    const dSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(fakeContact)
    } as MatDialogRef<any>);
    component.deleteContact(fakeContact);

    expect(dSpy).toHaveBeenCalled();
    expect(aSpy).toHaveBeenCalledWith('User deleted');
    expect(csSpy).toHaveBeenCalledWith(fakeContact[contactFields.ID]);
  });

  it('should listenForContacts', () => {
    const spy = spyOn(service, 'getContacts').and.returnValue(of(null));
    const rspy = spyOn(service, 'requestContacts').and.callFake(() => null);
    component.listenForContacts();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.contacts).toEqual([]);
    expect(rspy).toHaveBeenCalledTimes(1);
  });
});
