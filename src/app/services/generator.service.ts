import { Injectable, EventEmitter } from '@angular/core';
import { Color } from 'src/app/models/colors.model';

declare const Sass: any;

@Injectable({
	providedIn: 'root'
})
export class GeneratorService {

	private id: string;
	private name: string;
	private colors: Array<Color>;
	private css: string;

	cssGenerated: EventEmitter<boolean> = new EventEmitter();

	constructor() {
		this.colors = [
			{
				name: "text-color",
				hex: "#fff"
			},
			{
				name: "base-color",
				hex: "#23282d"
			},
			{
				name: "highlight-color",
				hex: "#0073aa"
			},
			{
				name: "notification-color",
				hex: "#d54e21"
			},
			{
				name: "body-background",
				hex: "#f1f1f1"
			},
			{
				name: "link",
				hex: "#0073aa"
			}
		];
	}

	setColor(name: string, hex: string): Array<Color> | boolean {
		const isColorHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
		const index = this.colors.findIndex(color => color.name === name);
		if (isColorHex && index > -1) {
			this.colors[index].hex = hex;
			return this.colors;
		}
		return false;

	}

	getColor(name: string): string {
		const index = this.colors.findIndex(color => color.name === name);
		if (index > -1) {
			return this.colors[index].hex
		}
		return '';

	}

	setAllColors(colors): Array<Color> {
		colors.forEach(color => {
			this.setColor(color.name, color.hex);
		})
		return this.colors = colors;
	}

	getAllColors(): Array<Color> {
		return this.colors;
	}

	setId(id: string): string {
		return this.id = id;
	}

	getId(): string {
		return this.id;
	}

	setName(name: string): string {
		return this.name = name;
	}

	getName(): string {
		return this.name;
	}

	getCSS(): string {
		return this.css;
	}

	generateCSS(): Promise<void> {
		return this.mergeSass().then(sass => {
			this.convertSASStoCSS(sass);
		});
	}

	generatePHP(): Promise<string> {
		return fetch('assets/functions.php.txt').then(y => y.text()).then(results => {
			return results
				.replace(/{{name}}/g, this.name)
				.replace(/{{id}}/g, this.id)
				.replace(/{{body-background}}/g, this.getColor('body-background'))
				.replace(/{{base-color}}/g, this.getColor('base-color'))
				.replace(/{{notification-color}}/g, this.getColor('notification-color'))
				.replace(/{{highlight-color}}/g, this.getColor('highlight-color'))
		})
	}

	getVariableSCSS(): string {
		let variableSCSS = '';
		if (this.colors) {
			this.colors.forEach(color => {
				variableSCSS += '$' + color.name + ':' + color.hex + ';'
			})
		}
		return variableSCSS;
	}

	makeSafeForCSS(id: string): string {
		return id.replace(/[^a-z0-9]/g, function (s) {
			var c = s.charCodeAt(0);
			if (c == 32) return '-';
			if (c >= 65 && c <= 90) return s.toLowerCase();
			return '__' + ('000' + c.toString(16)).slice(-4);
		});
	}

	mergeSass(): Promise<string> {
		const scssTemplates = ['assets/_variables.scss', 'assets/_mixins.scss', 'assets/_admin.scss']
		var promises = scssTemplates.map(url => fetch(url).then(templates => templates.text()));
		return Promise.all(promises).then(results => {
			return this.getVariableSCSS() + results.join('');
		})
	}

	convertSASStoCSS(sass): void {
		Sass.compile(sass, (result) => {
			this.css = result.text;
			this.cssGenerated.next(true);
		});
	}
}
