import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPage } from './pages/landing/landing.component';
import { ExportPage } from './pages/export/export.component';

const routes: Routes = [
	{ path: '', component: LandingPage },
	{ path: 'export/:id', component: ExportPage },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
