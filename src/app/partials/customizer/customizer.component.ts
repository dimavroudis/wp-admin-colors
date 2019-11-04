import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Color } from 'src/app/models/colors.model';
import { TranslateService } from '@ngx-translate/core';
import { ValidationService } from 'src/app/services/validation.service';
import { fadeIn } from 'src/app/animation';


@Component({
	selector: 'wpasg-customizer',
	templateUrl: './customizer.component.html',
	styleUrls: ['./customizer.component.scss'],
	animations: [ fadeIn ]
})
export class CustomizerComponent {
	@Input() colors: Array<Color>;
	@Input() name: string;
	@Input() id: string;

	@Output() colorChanged = new EventEmitter<Array<Color>>();
	@Output() nameChanged = new EventEmitter<string>();
	@Output() idChanged = new EventEmitter<string>();

	@Output() submited = new EventEmitter<boolean>();

	constructor(public translate: TranslateService, private validator: ValidationService) { }

	nameChange(value) {
		this.name = value;
		if (!this.id) {
			this.idChange(value);
		}
		this.nameChanged.emit(value);
	}

	idChange(value) {
		this.id = this.validator.makeSafeId(value);
		this.idChanged.emit(this.id);
	}

	colorChange() {
		this.colorChanged.emit(this.colors);
	}

	submit() {
		this.submited.emit(true);
	}


}
