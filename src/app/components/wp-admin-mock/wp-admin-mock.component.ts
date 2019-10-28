import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/models/colors.model';
@Component({
	selector: 'wp-admin-mock',
	templateUrl: './wp-admin-mock.component.html',
	styleUrls: ['./wp-admin-mock.component.scss']
})
export class WpAdminMockComponent implements OnInit {

	mockColors: any;

	@Input()colors: Array<Color>;
	@Input()name: string;
	@Input()id: string;

	constructor() { 
	}

	ngOnInit() {


	}

}
