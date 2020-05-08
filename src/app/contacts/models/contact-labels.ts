import { IKeyLabel, contactFields } from '@shared/models/contacts';
import { ValidatorFn, Validators } from '@angular/forms';

export interface IFormField extends IKeyLabel {
  validation: ValidatorFn[];
  initValue: string | number;
}

export const contactModel: IFormField[] = [
  {
    key: contactFields.ID,
    label: 'ID',
    initValue: 0,
    validation: [],
  },
  {
    key: contactFields.FIRST_NAME,
    label: 'First Name',
    validation: [Validators.required],
    initValue: '',
  },
  {
    key: contactFields.LAST_NAME,
    label: 'Last Name',
    validation: [Validators.required],
    initValue: '',
  },
  {
    key: contactFields.PHONE_NUMBER,
    label: 'Phone Number',
    validation: [Validators.required, Validators.minLength(10), Validators.pattern('[0-9 ]{11}')],
    initValue: '',
  },
  {
    key: contactFields.EMAIL,
    label: 'Email',
    validation: [Validators.required, Validators.minLength(10)],
    initValue: '',
  }
];
