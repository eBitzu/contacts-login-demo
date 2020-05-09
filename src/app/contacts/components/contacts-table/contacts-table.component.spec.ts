import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsTableComponent } from './contacts-table.component';
import { fakeContact } from '@contacts/modals/dialog-contact/dialog-contact.component.spec';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactsTableComponent', () => {
  let component: ContactsTableComponent;
  let fixture: ComponentFixture<ContactsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsTableComponent ],
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsTableComponent);
    component = fixture.componentInstance;
    component.contacts = [{...fakeContact}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    const initSpy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(initSpy).toHaveBeenCalledTimes(1);
    expect(component.dataSource.data).toEqual([fakeContact]);
    expect(component.dataSource.sort).toEqual(component.sort);
  });

  it('should change', () => {
    const initSpy = spyOn(component, 'ngOnChanges').and.callThrough();
    const contacts = new SimpleChange([fakeContact], [fakeContact, fakeContact], false);
    component.contacts = [fakeContact, fakeContact];
    component.ngOnChanges({
      contacts
    });
    expect(initSpy).toHaveBeenCalledWith({contacts});
    expect(component.dataSource.data).toEqual([fakeContact, fakeContact]);
  });
  it('should change', () => {
    const initSpy = spyOn(component, 'ngOnChanges').and.callThrough();
    const contacts = new SimpleChange([fakeContact], undefined, false);
    component.contacts = undefined;
    component.ngOnChanges({
      contacts
    });
    expect(initSpy).toHaveBeenCalledWith({contacts});
    expect(component.dataSource.data).toEqual([fakeContact]);
  });
});
