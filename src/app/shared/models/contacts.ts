export enum contactFields {
  ID = 'id',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PHONE_NUMBER = 'phoneNumber',
  EMAIL = 'email'
}
export interface IContact {
  [contactFields.ID]: number;
  [contactFields.FIRST_NAME]: string;
  [contactFields.LAST_NAME]: string;
  [contactFields.PHONE_NUMBER]: string;
  [contactFields.EMAIL]: string;
}

export interface IKeyLabel {
  key: string;
  label: string;
}
