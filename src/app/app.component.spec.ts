import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent, users } from './app.component';
import { STORAGE_KEYS } from '@shared/models/session-storage';
import { StorageService } from '@shared/services';
import { Router } from '@angular/router';
import { RoutesEnum } from '@shared/models/routes';
import { MaterialModule } from '@shared/material.module';

describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let service: StorageService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
      ],
      providers: [
        StorageService,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    app = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should init', () => {
    const spy = spyOn(app, 'ngOnInit').and.callThrough();
    sessionStorage.clear();
    const storageSpy = spyOn(window.sessionStorage, 'getItem').and.callFake(() => null);
    const storageSpySet = spyOn(window.sessionStorage, 'setItem').and.callFake(() => null);
    app.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(storageSpy).toHaveBeenCalledWith(STORAGE_KEYS.USERS);
    expect(storageSpySet).toHaveBeenCalledWith(STORAGE_KEYS.USERS, JSON.stringify(users));
  });

  it('should init2', () => {
    const spy = spyOn(app, 'ngOnInit').and.callThrough();
    const storageSpy = spyOn(window.sessionStorage, 'getItem').and.callFake(() => '{}');
    const storageSpySet = spyOn(window.sessionStorage, 'setItem').and.callFake(() => null);
    app.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(storageSpy).toHaveBeenCalledWith(STORAGE_KEYS.USERS);
    expect(storageSpySet).not.toHaveBeenCalled();
  });

  it('should get isLoggedIn', () => {
    expect(app.isLoggedIn).toBe(false);
    const spyService = spyOn(service, 'isUserLoggedIn').and.returnValue(true);
    expect(app.isLoggedIn).toBe(true);
    expect(spyService).toHaveBeenCalledTimes(1);
  });
  it('should get links', () => {
    expect(app.links).toEqual([
      { path: 'login', visible: true },
      { path: 'contacts', visible: false }
    ]);
  });
  it('should logout', () => {
    const spyService = spyOn(service, 'invalidateCurrentToken');
    const routerSpy = spyOn(router, 'navigate');
    app.logout();
    expect(spyService).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith([RoutesEnum.LOGIN]);
  });
});
