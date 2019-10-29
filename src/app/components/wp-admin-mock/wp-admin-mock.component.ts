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
				cssVariables += '--' + key + ':' + this.colors[key] + ';';
			}
		}
		return this.sanitizer.bypassSecurityTrustStyle(cssVariables);
	}



}
