import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { sharedGuards } from './guards';
import { sharedServices } from './services';
import { MaterialModule } from './material.module';
import { sharedDialogs } from './modals';

@NgModule({
  declarations: [...sharedDialogs],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [ReactiveFormsModule, MaterialModule],
  providers: [...sharedGuards, ...sharedServices],
  entryComponents: [...sharedDialogs],
})
export class SharedModule {}
