import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { sharedGuards } from './guards';
import {sharedServices} from './services';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [ReactiveFormsModule, MaterialModule],
  providers: [...sharedGuards, ...sharedServices],
})
export class SharedModule {}
