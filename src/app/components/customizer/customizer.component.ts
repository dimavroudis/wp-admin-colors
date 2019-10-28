import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Color } from 'src/app/models/colors.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
	selector: 'wpasg-customizer',
	templateUrl: './customizer.component.html',
	styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent {
	@Input() colors: Array<Color>;
	@Input() name: string;
	@Input() id: string;

	@Output() colorChanged = new EventEmitter<Array<Color>>();
	@Output() nameChanged = new EventEmitter<string>();
	@Output() idChanged = new EventEmitter<string>();

	@Output() submited = new EventEmitter<boolean>();

	constructor(public translate: TranslateService) { }

	nameChange() {
		this.nameChanged.emit(this.name);
	}

	idChange() {
		this.idChanged.emit(this.id);
	}

	colorChange() {
		this.colorChanged.emit(this.colors);
	}

	submit() {
		this.submited.emit(true);
	}


}
