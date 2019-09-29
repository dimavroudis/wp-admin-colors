import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPage } from './pages/landing/landing.component';
import { CustomizerPage } from './pages/customizer/customizer.component';
import { ExportPage } from './pages/export/export.component';

const routes: Routes = [
	{ path: 'landing', component: LandingPage },
	{ path: '', component: CustomizerPage },
	{ path: 'export', component: ExportPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
