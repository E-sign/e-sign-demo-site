import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { FormControl, FormGroup } from "@angular/forms";

import { CorprateLawComponent } from './corprate-law.component';

describe('CorprateLawComponent', () => {
  let component: CorprateLawComponent;
  let fixture: ComponentFixture<CorprateLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorprateLawComponent ],
      imports: [HttpClientTestingModule]
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


  it('should have at least one signer on form submit', () => {
    // Mock form input
    component.SignerDetails.controls.name.setValue('test')
    component.SignerDetails.controls.email.setValue('test@mail.com')
    // Add signer
    let array = component.onAddSigner()

    expect(array.length).toBeGreaterThan(0);
  });

  it('should pass the validation function', () => {
    // Mock form input
    component.SignerDetails.controls.name.setValue('test')
    component.SignerDetails.controls.email.setValue('test@mail.com')
    // Add signer
    component.onAddSigner()
    // call validation function
    let status = component.checkFormFields()
    expect(status).toBe("passed");
  });



});
