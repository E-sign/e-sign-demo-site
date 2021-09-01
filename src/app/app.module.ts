import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EmploymentLawComponent } from './pages/employment-law/employment-law.component';
import { InternationalLawComponent } from './pages/international-law/international-law.component';
import { CorprateLawComponent } from './pages/corprate-law/corprate-law.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EmploymentLawComponent,
    InternationalLawComponent,
    CorprateLawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
