import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EmploymentLawComponent } from './pages/employment-law/employment-law.component';
import { InternationalLawComponent } from './pages/international-law/international-law.component';
import { CorprateLawComponent } from './pages/corprate-law/corprate-law.component';
import { SignatureModalComponent } from "./modals/signature-modal/signature-modal.component";
import { SanitizerPipe } from './pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EmploymentLawComponent,
    InternationalLawComponent,
    CorprateLawComponent,
    SignatureModalComponent,
    SanitizerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
