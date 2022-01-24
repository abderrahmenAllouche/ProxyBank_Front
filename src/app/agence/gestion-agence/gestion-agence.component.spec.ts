import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceComponent } from './gestion-agence.component';

describe('GestionAgenceComponent', () => {
  let component: AgenceComponent;
  let fixture: ComponentFixture<AgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
