import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WpAdminMockComponent } from './components/wp-admin-mock/wp-admin-mock.component';
import { CustomizerPage } from './pages/customizer/customizer.component';
import { ExportPage } from './pages/export/export.component';
import { LandingPage } from './pages/landing/landing.component';
import { CodeComponent } from './components/code/code.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    WpAdminMockComponent,
    CustomizerPage,
    ExportPage,
    LandingPage,
	CodeComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
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
  providers: [],
  bootstrap: [AppComponent],
  exports: [WpAdminMockComponent, CodeComponent]
})
export class AppModule { }
