import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContactComponent } from './dialog-contact.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRefMock } from '@shared/mocks/test-mocks.classes';
import { IContact } from '@shared/models/contacts';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

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
          useValue: undefined,
        },
        {
          provide: MatDialogRef,
          useClass: MatDialogRefMock,
        },
      ],
      imports: [SharedModule, NoopAnimationsModule],
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
  it('should init', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    const pristine = spyOn(component.contactForm, 'markAsPristine');
    component.data = {...fakeContact};
    component.ngOnInit();

    expect(component.title).toBe('Edit contact');
    expect(component.buttonText).toBe('Save changes');
    expect(component.contactForm.getRawValue()).toEqual(fakeContact);
    expect(pristine).toHaveBeenCalledTimes(1);
  });
  it('should submit', () => {
    const button = fixture.debugElement.query(By.css('#btn_info_submit'));
    const spy = spyOn(component, 'submit').and.callThrough();
    component.contactForm.setValue(fakeContact);
    const dialogspy = spyOn(component.dialogRef, 'close').and.callThrough();
    button.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalled();
    expect(dialogspy).toHaveBeenCalledWith(fakeContact);
  });
});
