import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContactsComponent } from './page-contacts.component';
import { ContactsModule } from '@contacts/contacts.module';

describe('PageContactsComponent', () => {
  let component: PageContactsComponent;
  let fixture: ComponentFixture<PageContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContactsComponent ],
      imports: [
        ContactsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
