import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionConseillerClientComponent } from './gestion-conseiller-client.component';

describe('GestionConseillerClientComponent', () => {
  let component: GestionConseillerClientComponent;
  let fixture: ComponentFixture<GestionConseillerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionConseillerClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionConseillerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
