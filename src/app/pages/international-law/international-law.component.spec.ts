import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalLawComponent } from './international-law.component';

describe('InternationalLawComponent', () => {
  let component: InternationalLawComponent;
  let fixture: ComponentFixture<InternationalLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalLawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
