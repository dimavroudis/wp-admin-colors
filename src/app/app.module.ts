import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WpAdminMockComponent } from './partials/wp-admin-mock/wp-admin-mock.component';
import { CustomizerComponent } from './partials/customizer/customizer.component';
import { LandingPageComponent } from './pages/landing/landing.component';
import { CodeComponent } from './partials/code/code.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ExportPageComponent } from './pages/export/export.component';
import { AnalyticsService } from './services/analytics.service';
import { ToastrModule } from 'ngx-toastr';
import { OnboardingComponent } from './partials/onboarding/onboarding.component';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
	declarations: [
		AppComponent,
		WpAdminMockComponent,
		CustomizerComponent,
		LandingPageComponent,
		CodeComponent,
		ExportPageComponent,
		OnboardingComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ToastrModule.forRoot({
			easing: 'ease-in-out',
			positionClass: 'toast-bottom-right',
			timeOut: 3000,
			maxOpened: 5,
			autoDismiss: true
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		ColorPickerModule
	],
	providers: [AnalyticsService],
	bootstrap: [AppComponent],
	exports: [WpAdminMockComponent, CodeComponent, CustomizerComponent]
})
export class AppModule { }
