import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'wpasg-onboarding',
	templateUrl: './onboarding.component.html',
	styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

	@Output() start = new EventEmitter<any>();
	constructor() { }

	ngOnInit() {
	}

}
