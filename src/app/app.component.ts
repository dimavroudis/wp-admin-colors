import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { routerAnimation } from './animation';
import { StorageService } from './services/storage.service';
@Component({
	selector: 'wpasg-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		routerAnimation
	]
})
export class AppComponent {
	preferedScheme: string;

	constructor(
		public translate: TranslateService,
		public router: Router,
		private analytics: AnalyticsService,
		private storage: StorageService
	) {
		this.preferedScheme = this.storage.get('prefers-color-scheme');
		this.changeScheme();
		if (!this.preferedScheme) {
			this.preferedScheme = window.matchMedia('prefers-color-scheme: light').matches ? 'light' : 'dark';
		}

		translate.setDefaultLang('en');
		translate.use('en');

		this.analytics.setDimension('color_scheme');
		this.analytics.eventEmitter('color_scheme_dimension', {
			'color_scheme': this.preferedScheme
		});

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.analytics.setPageView(event.urlAfterRedirects);
			}
		});
	}

	toggleScheme() {
		this.preferedScheme = this.preferedScheme === 'light' ? 'dark' : 'light';
		this.changeScheme();
		this.analytics.eventEmitter('change_scheme', {
			'event_category': 'engangement',
			'event_label': this.preferedScheme
		});
		this.storage.set('prefers-color-scheme', this.preferedScheme);
		return this.preferedScheme;
	}

	changeScheme() {
		const html = document.querySelector('html');
		if (this.preferedScheme === 'light') {
			html.classList.add('light');
		} else {
			html.classList.remove('light');
		}
	}

	isLight() {
		return this.preferedScheme === 'light' ? true : false;
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}

}
