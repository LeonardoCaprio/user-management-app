import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should render Dashboard Page Properly', () => {
    expect(component).toBeTruthy();

    const navigateSpy = spyOn(component['router'], 'navigateByUrl');

    const cardSection = fixture.nativeElement.querySelector('#welcome-card');
    expect(cardSection).toBeTruthy();

    const buttonGoUserManagement = fixture.nativeElement.querySelector('#button-click-user-list');
    buttonGoUserManagement.click();

    component.navigateToUserManagement();
    expect(navigateSpy.calls.first().args[0].toString()).toBe('/users');
  });
});
