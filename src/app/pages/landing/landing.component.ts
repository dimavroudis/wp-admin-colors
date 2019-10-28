import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { Color } from 'src/app/models/colors.model';

@Component({
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss']
})
export class LandingPage implements OnInit {
	name: string;
	id: string;
	css: string;
	php: string;
	colors: Array<Color>;
	mockColors: any;

	constructor(private generator: GeneratorService) {
		this.mockColors = {};
	}

	ngOnInit() {
		this.colors = this.generator.getAllColors();
		this.setMockColors();
	}

	generateScheme() {
		this.generator.setAllColors(this.colors);
		this.generator.setName(this.name);
		this.generator.setId(this.id);

		this.generator.generateCSS();
		this.generator.generatePHP().then((php) => {
			this.php = php;
		});

		const cssEmiter = this.generator.cssGenerated.subscribe(value => {
			if (value) {
				this.css = this.generator.getCSS();
				cssEmiter.unsubscribe();
			}
		});
	}

	setColors(colors) {
		this.colors = colors;
		this.setMockColors();
	}

	setMockColors() {
		this.colors.forEach((color) => {
			this.mockColors[color.name] = color.hex;
		});
	}

	setName(name) {
		this.name = name;
	}

	setId(id) {
		this.id = id;
	}

}
