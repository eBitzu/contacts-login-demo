import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginComponent } from './page-login.component';
import { LoginService } from '@login/services';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginModule } from '@login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { users } from 'src/app/app.component';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RoutesEnum } from '@shared/models/routes';

describe('PageLoginComponent', () => {
  let component: PageLoginComponent;
  let fixture: ComponentFixture<PageLoginComponent>;
  let service: LoginService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLoginComponent ],
      providers: [LoginService, FormBuilder],
      imports: [ RouterTestingModule.withRoutes(routes), LoginModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    service = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    const spy = spyOn(component, 'submit').and.callThrough();
    const lSpy = spyOn(service, 'checkLogin').and.returnValue(of(true));
    const rSpy = spyOn(router, 'navigate').and.callFake(() => null);
    const button = fixture.debugElement.query(By.css('.btn-block'));
    component.loginForm.setValue(users[0]);
    button.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalledTimes(1);
    expect(lSpy).toHaveBeenCalledWith(users[0]);
    expect(rSpy).toHaveBeenCalledWith([RoutesEnum.CONTACTS]);
  });

  it('should submit - error', () => {
    const spy = spyOn(component, 'submit').and.callThrough();
    const cspy = spyOn(window.console, 'error').and.callFake(() => {});
    const aspy = spyOn(window, 'alert').and.callFake(() => {});
    const lSpy = spyOn(service, 'checkLogin').and.returnValue(throwError({message: 'failed'}));
    const rSpy = spyOn(router, 'navigate').and.callFake(() => null);
    const button = fixture.debugElement.query(By.css('.btn-block'));
    component.loginForm.setValue(users[0]);
    button.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalledTimes(1);
    expect(lSpy).toHaveBeenCalledWith(users[0]);
    expect(cspy).toHaveBeenCalledWith({message: 'failed'});
    expect(aspy).toHaveBeenCalledWith('Login failed!');
    expect(rSpy).not.toHaveBeenCalledWith([RoutesEnum.CONTACTS]);
  });

  it('should submit - error', () => {
    const spy = spyOn(component, 'submit').and.callThrough();
    const cspy = spyOn(window.console, 'error').and.callFake(() => {});
    const aspy = spyOn(window, 'alert').and.callFake(() => {});
    const rSpy = spyOn(router, 'navigate').and.callFake(() => null);
    const button = fixture.debugElement.query(By.css('.btn-block'));
    component.loginForm.setValue({email: 'fake@fake.com', pass: 'fake'});
    button.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalledTimes(1);
    expect(cspy).toHaveBeenCalled();
    expect(aspy).toHaveBeenCalledWith('Login failed!');
    expect(rSpy).not.toHaveBeenCalledWith([RoutesEnum.CONTACTS]);
  });
});
