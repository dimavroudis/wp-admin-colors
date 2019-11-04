import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing/landing.component';
import { ExportPageComponent } from './pages/export/export.component';

const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent,
		data: {
			title: 'WordPress Admin Scheme Generator',
			description: 'Create your own WordPress Admin Scheme in less than a minute!',
			animation: 'landing',
			state: null
		}
	},
	{
		path: 'generate',
		component: LandingPageComponent,
		data: {
			title: 'Create your scheme | WordPress Admin Scheme Generator',
			description: 'Create your WordPress Admin scheme with a few clicks!',
			animation: 'landing',
			state: 'init'
		}
	},
	{
		path: 'export/:id',
		component: ExportPageComponent,
		data: {
			title: 'Export your scheme | WordPress Admin Scheme Generator',
			description: 'Export your WordPress Admin scheme in 2 steps!',
			animation: 'export'
		}
	},
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
