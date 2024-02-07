import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing/landing.component';
import { ExportPageComponent } from './pages/export/export.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';

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
			state: 'init'
		}
	},
	{
		path: 'export/:id',
		component: ExportPageComponent,
	},
	{
		path: 'privacy',
		component: PrivacyComponent,

	},
	{
		path: 'terms',
		component: TermsComponent,
	},
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
