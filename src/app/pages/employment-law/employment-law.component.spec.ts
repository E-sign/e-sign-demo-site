import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentLawComponent } from './employment-law.component';

describe('EmploymentLawComponent', () => {
  let component: EmploymentLawComponent;
  let fixture: ComponentFixture<EmploymentLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentLawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
