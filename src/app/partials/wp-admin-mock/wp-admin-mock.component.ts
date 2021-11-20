import { Component, Input } from '@angular/core';
import { Color } from 'src/app/models/colors.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import tinycolor from 'tinycolor2';

@Component({
	selector: 'wpasg-mockup',
	templateUrl: './wp-admin-mock.component.html',
	styleUrls: ['./wp-admin-mock.component.scss'],
})
export class WpAdminMockComponent {

	mockColors: any;

	@Input() colors: Array<Color>;
	@Input() name: string;
	@Input() id: string;

	constructor(private sanitizer: DomSanitizer) {
	}

	getCssVariables(): SafeStyle {
		let cssVariables = '';
		for (const key in this.colors) {
			if (this.colors[key]) {
				cssVariables += '--mock-' + key + ':' + this.colors[key] + ';';
				if (key === 'base-color') {
					cssVariables += '--mock-submenu-color:' + tinycolor(this.colors[key]).darken(7).toString() + ';';
				}
			}
		}
		return this.sanitizer.bypassSecurityTrustStyle(cssVariables);
	}



}
