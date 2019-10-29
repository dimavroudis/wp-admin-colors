import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'wpasg-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'wp-admin-scheme';

	constructor(translate: TranslateService) {
		translate.setDefaultLang('en');
		translate.use('en');
	}

}
