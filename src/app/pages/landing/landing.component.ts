import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { Color } from 'src/app/models/colors.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss']
})
export class LandingPageComponent implements OnInit {
	name: string;
	id: string;
	css: string;
	php: string;
	colors: Array<Color>;
	mockColors: any;
	init: boolean;

	constructor(private generator: GeneratorService, private router: Router,  private route: ActivatedRoute ) {
		this.mockColors = {};
	}

	ngOnInit() {
		this.init = this.route.snapshot.data.state === 'init';
		if (!this.init) {
			this.generator.rotateColors().subscribe(colors => {
				this.colors = colors;
				this.setMockColors();
			});
		}
		this.id = this.generator.getId();
		this.name = this.generator.getName();
		this.colors = this.generator.getAllColors();
		this.setMockColors();
	}

	generateScheme() {
		this.generator.setAllColors(this.colors);
		this.generator.setName(this.name);
		this.generator.setId(this.id);
		this.router.navigate(['/export', this.id]);
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
