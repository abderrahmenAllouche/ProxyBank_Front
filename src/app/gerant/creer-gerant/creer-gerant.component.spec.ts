import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerGerantComponent } from './creer-gerant.component';

describe('CreerGerantComponent', () => {
  let component: CreerGerantComponent;
  let fixture: ComponentFixture<CreerGerantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerGerantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
