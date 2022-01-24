import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionConseillerComponent } from './admin-gestion-conseiller.component';

describe('AdminGestionConseillerComponent', () => {
  let component: AdminGestionConseillerComponent;
  let fixture: ComponentFixture<AdminGestionConseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGestionConseillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGestionConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
