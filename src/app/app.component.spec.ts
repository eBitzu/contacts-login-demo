import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';

describe('AppComponent', () => {
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should init`, () => {
    const app: AppComponent  = fixture.componentInstance;
    const spy = spyOn(app, 'ngOnInit');
    app.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
