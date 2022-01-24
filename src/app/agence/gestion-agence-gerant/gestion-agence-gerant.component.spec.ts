import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAgenceGerantComponent } from './gestion-agence-gerant.component';

describe('GestionAgenceGerantComponent', () => {
  let component: GestionAgenceGerantComponent;
  let fixture: ComponentFixture<GestionAgenceGerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAgenceGerantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAgenceGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
