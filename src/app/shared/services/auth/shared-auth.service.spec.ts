import { TestBed } from '@angular/core/testing';

import { SharedAuthService } from './shared-auth.service';
import { SharedModule } from '@shared/shared.module';

describe('SharedAuthService', () => {
  let service: SharedAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedAuthService],
      imports: [SharedModule]
    });
    service = TestBed.inject(SharedAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
