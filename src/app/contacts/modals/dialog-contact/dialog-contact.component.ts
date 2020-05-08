import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IContact, contactFields } from '@shared/models/contacts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormField, contactModel } from '@contacts/models/contact-labels';


@Component({
  selector: 'app-dialog-contact',
  templateUrl: './dialog-contact.component.html',
  styles: []
})
export class DialogContactComponent implements OnInit {
  public title = 'Create new contact';
  public buttonText = 'Create';
  public contactFieldsEnum = contactFields;
  public formFields: IFormField[] = contactModel;
  public contactForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IContact
  ) { }


  ngOnInit(): void {
    this.formFields.forEach(({key, validation, initValue}) => {
      this.contactForm.addControl(key, this.fb.control(initValue, validation));
    });
    if (this.data) {
      this.title = 'Edit contact';
      this.buttonText = 'Save changes';
      this.contactForm.setValue(this.data);
    }
  }

  submit() {
    this.dialogRef.close(this.contactForm.getRawValue());
  }

}
