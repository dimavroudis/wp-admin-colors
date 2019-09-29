import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
	selector: 'export-page',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.scss']
})
export class ExportPage implements OnInit {
	css: string;
	php: string;
	constructor(private generator: GeneratorService) { }

	ngOnInit() {
		this.generator.generateCSS();
		this.generator.generatePHP().then((php)=>{
			this.php = php;
		});
		this.generator.cssGenerated.subscribe(value => {
			if (value) {
				this.css = this.generator.getCSS();
			}
		});

	}

}
