import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBookingsComponent } from './listing-bookings.component';

describe('ListingBookingsComponent', () => {
  let component: ListingBookingsComponent;
  let fixture: ComponentFixture<ListingBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
