import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenericDeleteComponent, IDeleteDialog } from './dialog-generic-delete.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '@shared/material.module';

describe('DialogGenericDeleteComponent', () => {
  let component: DialogGenericDeleteComponent;
  let fixture: ComponentFixture<DialogGenericDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogGenericDeleteComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            text: 'Are you sure',
            title: 'Delete contact'
          } as IDeleteDialog,
        },
      ],
      imports: [MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGenericDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
