import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthformComponent } from './user-authform.component';

describe('UserAuthformComponent', () => {
  let component: UserAuthformComponent;
  let fixture: ComponentFixture<UserAuthformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
