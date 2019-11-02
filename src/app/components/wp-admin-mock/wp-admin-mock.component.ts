import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/models/colors.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
	selector: 'wpasg-mockup',
	templateUrl: './wp-admin-mock.component.html',
	styleUrls: ['./wp-admin-mock.component.scss']
})
export class WpAdminMockComponent implements OnInit {

	mockColors: any;

	@Input() colors: Array<Color>;
	@Input() name: string;
	@Input() id: string;

	constructor(private sanitizer: DomSanitizer) {
	}

	ngOnInit() {

	}

	getCssVariables() {
		let cssVariables = '';
		for (const key in this.colors) {
			if (this.colors[key]) {
				cssVariables += '--mock-' + key + ':' + this.colors[key] + ';';
				if (key === 'base-color') {
					cssVariables += '--mock-submenu-color:' + this.lightenDarkenColor('#23282d', -7) + ';';
				}
			}
		}
		return this.sanitizer.bypassSecurityTrustStyle(cssVariables);
	}

	lightenDarkenColor(col, amt) {

		let usePound = false;
		if (col[0] === '#') {
			col = col.slice(1);
			usePound = true;
		}
		const num = parseInt(col, 16);
		// tslint:disable-next-line: no-bitwise
		let r = (num >> 16) + amt;
		if (r > 255) {
			r = 255;
		} else if (r < 0) {
			r = 0;
		}

		// tslint:disable-next-line: no-bitwise
		let b = ((num >> 8) & 0x00FF) + amt;

		if (b > 255) {
			b = 255;
		} else if (b < 0) {
			b = 0;
		}

		// tslint:disable-next-line: no-bitwise
		let g = (num & 0x0000FF) + amt;

		if (g > 255) {
			g = 255;
		} else if (g < 0) {
			g = 0;
		}

		// tslint:disable-next-line: no-bitwise
		return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);

	}



}
