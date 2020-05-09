import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginComponent } from './page-login.component';
import { LoginService } from '@login/services';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginModule } from '@login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PageLoginComponent', () => {
  let component: PageLoginComponent;
  let fixture: ComponentFixture<PageLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLoginComponent ],
      providers: [LoginService, FormBuilder],
      imports: [ RouterTestingModule.withRoutes(routes), LoginModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
