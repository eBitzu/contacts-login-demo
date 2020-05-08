import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenericDeleteComponent } from './dialog-generic-delete.component';

describe('DialogGenericDeleteComponent', () => {
  let component: DialogGenericDeleteComponent;
  let fixture: ComponentFixture<DialogGenericDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGenericDeleteComponent ]
    })
    .compileComponents();
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
