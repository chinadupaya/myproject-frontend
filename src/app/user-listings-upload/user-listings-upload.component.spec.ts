import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListingsUploadComponent } from './user-listings-upload.component';

describe('UserListingsUploadComponent', () => {
  let component: UserListingsUploadComponent;
  let fixture: ComponentFixture<UserListingsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListingsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListingsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
