import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let routerEvents$: Subject<NavigationEnd>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    routerEvents$ = new Subject<NavigationEnd>();
    routerMock = {
      events: routerEvents$.asObservable(),
      navigate: jasmine.createSpy('navigate'),
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
      ],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'user-management-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('user-management-app');
  });

  it('should toggle sidenav when toggleSidenav is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const initialState = app.isExpanded;

    app.toggleSidenav();

    expect(app.isExpanded).toBe(!initialState);
  });

  it('should change selectedTab and navigate when redirectNavigation is called to user management', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.redirectNavigation('userPanel');

    expect(app.selectedTab).toBe('userPanel');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should change selectedTab and navigate when redirectNavigation is called to dashboard', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.redirectNavigation('dashboard');

    expect(app.selectedTab).toBe('dashboard');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set selectedTab correctly in ngOnInit based on NavigationEnd event', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    routerEvents$.next(new NavigationEnd(1, '/', '/'));
    expect(app.selectedTab).toBe('dashboard');

    routerEvents$.next(new NavigationEnd(2, '/users', '/users'));
    expect(app.selectedTab).toBe('userPanel');
  });
});
