import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/colors.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
	selector: 'customizer-page',
	templateUrl: './customizer.component.html',
	styleUrls: ['./customizer.component.scss']
})
export class CustomizerPage implements OnInit {
	colors: Array<Color>;
	name: string;
	id: string;

	constructor(private generator: GeneratorService, private router: Router, public translate: TranslateService) { }

	ngOnInit() {
		this.colors = this.generator.getAllColors();
	}

	generateScheme(){
		this.generator.setAllColors(this.colors);
		this.router.navigate(['/export']);
	}

	setName(input){
		console.log(input.value);
		this.generator.setName(input.value);
	}

	setId(input){
		console.log(input.value);
		input.value = this.generator.makeSafeForCSS(input.value)
		this.generator.setId(input.value);
	}

}
