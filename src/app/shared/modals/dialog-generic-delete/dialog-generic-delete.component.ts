import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDeleteDialog {
  title: string;
  text: string;
}

@Component({
  selector: 'app-dialog-generic-delete',
  templateUrl: './dialog-generic-delete.component.html',
  styles: [
  ]
})
export class DialogGenericDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialog
  ) { }
}
