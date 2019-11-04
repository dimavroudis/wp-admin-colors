import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, RouterOutlet, ActivatedRoute } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';
import { routerAnimation } from './animation';
import { StorageService } from './services/storage.service';
import { Title, Meta } from '@angular/platform-browser';
import { filter, mergeMap, map } from 'rxjs/operators';

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
		private storage: StorageService,
		private titleService: Title,
		private meta: Meta,
		public route: ActivatedRoute
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

		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map((event: NavigationEnd) => {
				this.analytics.setPageView(event.urlAfterRedirects);
				return this.route;
			}),
			map((route) => {
				while (route.firstChild) { route = route.firstChild; }
				return route;
			}),
			filter((route) => route.outlet === 'primary'),
			mergeMap((route) => route.data)
		).subscribe((event) => {
			this.titleService.setTitle(event.title);
			this.meta.updateTag({ name: 'og:title', content: event.title });
			this.meta.updateTag({ name: 'description', content: event.description });
			this.meta.updateTag({ name: 'og:description', content: event.description });
			this.meta.updateTag({ name: 'og:type', content: 'website' });
			this.meta.updateTag({
				name: 'og:image',
				content: (window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/') + 'assets/images/og-image.png'
			});
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
