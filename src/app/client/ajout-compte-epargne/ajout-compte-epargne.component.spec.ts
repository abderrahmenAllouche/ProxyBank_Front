import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCompteEpargneComponent } from './ajout-compte-epargne.component';

describe('AjoutCompteEpargneComponent', () => {
  let component: AjoutCompteEpargneComponent;
  let fixture: ComponentFixture<AjoutCompteEpargneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutCompteEpargneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCompteEpargneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
