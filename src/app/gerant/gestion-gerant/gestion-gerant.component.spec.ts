import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantComponent } from './gestion-gerant.component';

describe('GestionGerantComponent', () => {
  let component: GerantComponent;
  let fixture: ComponentFixture<GerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
