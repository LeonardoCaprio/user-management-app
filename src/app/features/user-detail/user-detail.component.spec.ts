import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from '../../core/service/user.service';
import { of } from 'rxjs';

class MockUserDetailDataService {
  getUserDetailById() {
    return of({
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
      address: {
        street: 'Dayna Park',
        suite: 'Suite 449',
        city: 'Bartholomebury',
        zipcode: '76495-3109',
        geo: {
          lat: '24.6463',
          lng: '-168.8889',
        },
      },
      phone: '(775)976-6794 x41206',
      website: 'conrad.com',
      company: {
        name: 'Yost and Sons',
        catchPhrase: 'Switchable contextually-based project',
        bs: 'aggregate real-time technologies',
      },
    });
  }
}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: '9' }),
    });
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        { provide: UserService, useClass: MockUserDetailDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: mockActivatedRoute,
          },
        },
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render user-detail page properly and then user click go back', () => {
    expect(component).toBeTruthy();

    const goBackSpy = spyOn(window.history, 'back');
    const backButton = fixture.nativeElement.querySelector(
      '#button-back-user-detail'
    );
    backButton.click();
    expect(goBackSpy).toHaveBeenCalled();
  });

  it('should render user-detail page properly', async () => {
    spyOn(window, 'open');

    component.user = {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
      address: {
        street: 'Dayna Park',
        suite: 'Suite 449',
        city: 'Bartholomebury',
        zipcode: '76495-3109',
        geo: {
          lat: '24.6463',
          lng: '-168.8889',
        },
      },
      phone: '(775)976-6794 x41206',
      website: 'conrad.com',
      company: {
        name: 'Yost and Sons',
        catchPhrase: 'Switchable contextually-based project',
        bs: 'aggregate real-time technologies',
      },
    };

    await fixture.whenStable();
    fixture.detectChanges();

    const websiteSpan = fixture.nativeElement.querySelector(
      '#user-info-website-click'
    );
    expect(websiteSpan).toBeTruthy();

    websiteSpan.click();

    expect(window.open).toHaveBeenCalledWith('https://conrad.com', '_blank');
  });
});
