import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Color } from 'src/app/models/colors.model';
import { TranslateService } from '@ngx-translate/core';
import { ValidationService } from 'src/app/services/validation.service';
import { fadeIn } from 'src/app/animation';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'wpasg-customizer',
	templateUrl: './customizer.component.html',
	styleUrls: ['./customizer.component.scss'],
	animations: [fadeIn]
})
export class CustomizerComponent {
	@Input() colors: Array<Color>;
	@Input() name: string;
	@Input() id: string;

	@Output() colorChanged = new EventEmitter<Array<Color>>();
	@Output() nameChanged = new EventEmitter<string>();
	@Output() idChanged = new EventEmitter<string>();

	@Output() submited = new EventEmitter<boolean>();

	constructor(public translate: TranslateService, private validator: ValidationService, private toastr: ToastrService) { }

	nameChange(value: string): void {
		this.name = value;
		if (!this.id) {
			this.idChange(value);
		}
		this.nameChanged.emit(value);
	}

	idChange(value: string): void {
		this.id = this.validator.makeSafeId(value);
		this.idChanged.emit(this.id);
	}

	getInputChangeTarget(event): HTMLTextAreaElement {
		return event.target as HTMLTextAreaElement;
	}

	colorChange(): void {
		this.colorChanged.emit(this.colors);
	}

	submit(): void {
		if (!this.name || !this.id) {
			if (!this.name) {
				this.toastr.error('Please provide a name for your scheme.');
			}
			if (!this.id) {
				this.toastr.error('Please provide an id for your scheme.');
			}
			return;
		}
		this.submited.emit(true);
	}


}
