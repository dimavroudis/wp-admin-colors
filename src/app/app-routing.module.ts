import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing/landing.component';
import { ExportPageComponent } from './pages/export/export.component';

const routes: Routes = [
	{ path: '', component: LandingPageComponent },
	{ path: 'export/:id', component: ExportPageComponent },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
