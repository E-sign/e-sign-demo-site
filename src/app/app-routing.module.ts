import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from "./pages/landing/landing.component";
import { CorprateLawComponent } from "./pages/corprate-law/corprate-law.component";
import { InternationalLawComponent } from "./pages/international-law/international-law.component";
import { EmploymentLawComponent } from "./pages/employment-law/employment-law.component";

const routes: Routes = [
  { path: 'landing', component: LandingComponent},
  { path: 'corporate-law', component: CorprateLawComponent},
  { path: 'international-law', component: InternationalLawComponent},
  { path: 'employment-law', component: EmploymentLawComponent},
  // redirects
  { path: '',   redirectTo: '/landing', pathMatch: 'full' },

  // 404 error - Wildcard catcher
  { path: '**',  redirectTo: '/landing', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
