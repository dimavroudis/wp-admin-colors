import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { Color } from 'src/app/models/colors.model';

@Component({
	selector: 'wpasg-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.scss']
})
export class ExportPage implements OnInit {

	isGenerated: boolean;
	php: string;
	css: string;
	cssEmiter: any;

	constructor(private generator: GeneratorService) {}

	ngOnInit() {
		this.isGenerated = false;
		this.cssEmiter = this.generator.statusChaged.subscribe(value => {
			// console.log(value);
			if (value.done) {
				this.css = this.generator.getCSS();
				this.php = this.generator.getPHP();
				this.isGenerated = value.done;
				this.cssEmiter.unsubscribe();
			}
		});
		this.generator.generateCSS();
		this.generator.generatePHP();
	}



}
