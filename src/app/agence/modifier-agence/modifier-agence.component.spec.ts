import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAgenceComponent } from './modifier-agence.component';

describe('ModifierAgenceComponent', () => {
  let component: ModifierAgenceComponent;
  let fixture: ComponentFixture<ModifierAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierAgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
