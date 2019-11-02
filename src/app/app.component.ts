import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { routerAnimation } from './animation';
@Component({
	selector: 'wpasg-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		routerAnimation
	]
})
export class AppComponent {
	prefersLight: boolean;

	constructor(translate: TranslateService, public router: Router, private analytics: AnalyticsService) {
		this.prefersLight = window.matchMedia('prefers-color-scheme: light').matches;
		translate.setDefaultLang('en');
		translate.use('en');

		this.analytics.setDimension('color_scheme');
		this.analytics.eventEmitter('color_scheme_dimension', {
			'color_scheme': this.prefersLight ? 'light' : 'dark'
		});

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.analytics.setPageView(event.urlAfterRedirects);
			}
		});
	}

	changeScheme() {
		this.prefersLight = !this.prefersLight;
		const html = document.querySelector('html');
		if (this.prefersLight) {
			html.classList.add('light');
		} else {
			html.classList.remove('light');
		}
		this.analytics.eventEmitter('change_scheme', {
			'event_category': 'engangement',
			'event_label': this.prefersLight ? 'light' : 'dark'
		});
		return this.prefersLight;
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}

}
