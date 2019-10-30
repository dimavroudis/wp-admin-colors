import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { Color } from 'src/app/models/colors.model';

@Component({
	selector: 'wpasg-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.scss']
})
export class ExportPage implements OnInit {

	isGenerated: boolean  = false;
	php: string;
	css: string;
	generatorProgress: any;
	id: string;

	constructor(private generator: GeneratorService) {}

	ngOnInit() {
		this.id = this.generator.getId();
		this.generatorProgress = this.generator.statusChaged.subscribe(value => {
			this.isGenerated = value.done;
			if (this.isGenerated) {
				this.css = this.generator.getCSS();
				this.php = this.generator.getPHP();
				this.generatorProgress.unsubscribe();
				this.generator.reset();
			}
		});
		this.generator.generateCSS();
		this.generator.generatePHP();
	}



}
