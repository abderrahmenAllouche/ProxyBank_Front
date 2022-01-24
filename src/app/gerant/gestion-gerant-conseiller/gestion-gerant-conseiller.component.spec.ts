import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGerantConseillerComponent } from './gestion-gerant-conseiller.component';

describe('GestionGerantConseillerComponent', () => {
  let component: GestionGerantConseillerComponent;
  let fixture: ComponentFixture<GestionGerantConseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionGerantConseillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGerantConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
