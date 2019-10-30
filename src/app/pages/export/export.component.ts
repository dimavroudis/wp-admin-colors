import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { Color } from 'src/app/models/colors.model';

@Component({
	selector: 'wpasg-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.scss']
})
export class ExportPage implements OnInit, OnDestroy {
	id: string;
	name: string;
	colors: Color[];
	isGenerated: boolean;
	php: string;
	css: string;
	cssEmiter: any;

	constructor(private generator: GeneratorService) {}

	ngOnInit() {
		this.cssEmiter = this.generator.cssGenerated.subscribe(value => {
			if (value) {
				this.css = this.generator.getCSS();
				this.isGenerated = typeof this.php !== 'undefined' && typeof this.css !== 'undefined';
			}
		});
		this.isGenerated = false;
		this.id = this.generator.getId();
		this.name = this.generator.getName();
		this.colors = this.generator.getAllColors();
		this.generator.generateCSS();
		this.generator.generatePHP().then((php) => {
			this.php = php;
			this.isGenerated = typeof this.php !== 'undefined' && typeof this.css !== 'undefined';
		});

		
	}


	ngOnDestroy(): void {

		this.cssEmiter.unsubscribe();
	}

}
