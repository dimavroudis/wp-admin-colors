import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing/landing.component';
import { ExportPageComponent } from './pages/export/export.component';

const routes: Routes = [
	{ path: '', component: LandingPageComponent, data: { animation: 'landing', state: null } },
	{ path: 'generate', component: LandingPageComponent, data: { animation: 'landing', state: 'init' } },
	{ path: 'export/:id', component: ExportPageComponent, data: { animation: 'export' } },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
