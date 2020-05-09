import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContactComponent } from './dialog-contact.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefMock } from '@shared/mocks/test-mocks.classes';
import { IContact } from '@shared/models/contacts';
import { NO_ERRORS_SCHEMA } from '@angular/core';

export const fakeContact: IContact = {
  id: 1,
  email: 'abc@amb.com',
  firstName: 'a',
  lastName: 'b',
  phoneNumber: '1234567890'
};

describe('DialogContactComponent', () => {
  let component: DialogContactComponent;
  let fixture: ComponentFixture<DialogContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogContactComponent],
      providers: [
        FormBuilder,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            ...fakeContact
          },
        },
        {
          provide: MatDialogRef,
          useClass: MatDialogRefMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
