import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservationsComponent } from './view-reservations.component';

describe('ViewReservationsComponent', () => {
  let component: ViewReservationsComponent;
  let fixture: ComponentFixture<ViewReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
