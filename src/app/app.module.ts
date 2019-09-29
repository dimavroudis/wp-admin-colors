import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { WpAdminMockComponent } from './components/wp-admin-mock/wp-admin-mock.component';
import { CustomizerPage } from './pages/customizer/customizer.component';
import { ExportPage } from './pages/export/export.component';
import { LandingPage } from './pages/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    WpAdminMockComponent,
    CustomizerPage,
    ExportPage,
    LandingPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ColorPickerComponent, WpAdminMockComponent]
})
export class AppModule { }
