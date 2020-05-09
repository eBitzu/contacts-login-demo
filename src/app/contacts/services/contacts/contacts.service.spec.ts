import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { ContactsModule } from '@contacts/contacts.module';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsService],
      imports: [ContactsModule]
    });
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
