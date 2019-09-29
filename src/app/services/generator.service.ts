import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GeneratorService {

	private id: string;
	private name: string;
	private colors: any;


	constructor() { }

	setColors(colors) {
		return this.colors = colors;
	}

	getColors() {
		return this.colors;
	}

	setId(id: string) {
		return this.id = id;
	}

	getId() {
		return this.id;
	}

	setName(name: string) {
		return this.name = name;
	}

	getName() {
		return this.name;
	}

	convertSASStoCSS() {
		// var scss = '$someVar: 123px; .some-selector { width: $someVar; }';
		// Sass.compile(scss, function(result) {
		//   console.log(result);
		// });
	}
}
