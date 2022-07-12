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
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { BytesPipe } from "./pipes/bytes.pipe";
import { NavBarComponent } from './common/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EmploymentLawComponent,
    InternationalLawComponent,
    CorprateLawComponent,
    SanitizerPipe,
    BytesPipe,
    NavBarComponent
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
