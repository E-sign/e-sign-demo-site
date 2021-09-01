import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorprateLawComponent } from './corprate-law.component';

describe('CorprateLawComponent', () => {
  let component: CorprateLawComponent;
  let fixture: ComponentFixture<CorprateLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorprateLawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorprateLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
