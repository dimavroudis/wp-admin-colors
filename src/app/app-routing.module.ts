import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPage } from './pages/landing/landing.component';

const routes: Routes = [
	{ path: '', component: LandingPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
