import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerConseillerComponent } from './creer-conseiller.component';

describe('CreerConseillerComponent', () => {
  let component: CreerConseillerComponent;
  let fixture: ComponentFixture<CreerConseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerConseillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
