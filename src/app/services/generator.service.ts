import { Injectable, EventEmitter } from '@angular/core';
import { Color } from 'src/app/models/colors.model';
import { ValidationService } from './validation.service';
import { StorageService } from './storage.service';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

declare const Sass: any;

@Injectable({
	providedIn: 'root'
})
export class GeneratorService {

	private id: string;
	private name: string;
	private colors: Color[];
	private colorsList: Color[][];
	private css: string;
	private php: string;

	progress: EventEmitter<any> = new EventEmitter();

	constructor(private storage: StorageService, private validator: ValidationService) {
		this.colorsList = [
			[
				{
					name: 'text-color',
					hex: '#fff'
				},
				{
					name: 'base-color',
					hex: '#23282d'
				},
				{
					name: 'highlight-color',
					hex: '#0073aa'
				},
				{
					name: 'notification-color',
					hex: '#d54e21'
				},
				{
					name: 'body-background',
					hex: '#f1f1f1'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#0073aa'
				},
				{
					name: 'form-checked',
					hex: '#0073aa'
				}
			],
			[
				{
					name: 'text-color',
					hex: '#e5f8ff'
				},
				{
					name: 'base-color',
					hex: '#52accc'
				},
				{
					name: 'highlight-color',
					hex: '#096484'
				},
				{
					name: 'notification-color',
					hex: '#e1a948'
				},
				{
					name: 'body-background',
					hex: '#fff'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#52accc'
				},
				{
					name: 'form-checked',
					hex: '#52accc'
				}
			],
			[
				{
					name: 'text-color',
					hex: '#fff'
				},
				{
					name: 'base-color',
					hex: ' #59524c'
				},
				{
					name: 'highlight-color',
					hex: '#c7a589'
				},
				{
					name: 'notification-color',
					hex: '#9ea476'
				},
				{
					name: 'body-background',
					hex: '#fff'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#59524c'
				},
				{
					name: 'form-checked',
					hex: '#59524c'
				}
			],
			[
				{
					name: 'text-color',
					hex: '#fff'
				},
				{
					name: 'base-color',
					hex: '#523f6d'
				},
				{
					name: 'highlight-color',
					hex: '#a3b745'
				},
				{
					name: 'notification-color',
					hex: '#d46f15'
				},
				{
					name: 'body-background',
					hex: '#fff'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#523f6d'
				},
				{
					name: 'form-checked',
					hex: '#523f6d'
				}
			],
			[
				{
					name: 'text-color',
					hex: '#333'
				},
				{
					name: 'base-color',
					hex: '#e5e5e5'
				},
				{
					name: 'highlight-color',
					hex: '#04a4cc'
				},
				{
					name: 'notification-color',
					hex: '#d64e07'
				},
				{
					name: 'body-background',
					hex: '#f5f5f5'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#04a4cc'
				},
				{
					name: 'form-checked',
					hex: '#04a4cc'
				}
			],
			[
				{
					name: 'text-color',
					hex: '#fff'
				},
				{
					name: 'base-color',
					hex: '#363b3f'
				},
				{
					name: 'highlight-color',
					hex: '#69a8bb'
				},
				{
					name: 'notification-color',
					hex: '#e14d43'
				},
				{
					name: 'body-background',
					hex: '#fff'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#363b3f'
				},
				{
					name: 'form-checked',
					hex: '#363b3f'
				}
			],
			[
				{
					name: 'text-color',
					hex: '#f2fcff'
				},
				{
					name: 'base-color',
					hex: '#738e96'
				},
				{
					name: 'highlight-color',
					hex: '#9ebaa0'
				},
				{
					name: 'notification-color',
					hex: '#aa9d88'
				},
				{
					name: 'body-background',
					hex: '#fff'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#738e96'
				},
				{
					name: 'form-checked',
					hex: '#738e96'
				}
			],
			[
				{
					name: 'text-color',
					hex: '#fff'
				},
				{
					name: 'base-color',
					hex: '#cf4944'
				},
				{
					name: 'highlight-color',
					hex: '#dd823b'
				},
				{
					name: 'notification-color',
					hex: '#ccaf0b'
				},
				{
					name: 'body-background',
					hex: '#fff'
				},
				{
					name: 'link',
					hex: '#0073aa'
				},
				{
					name: 'button-color',
					hex: '#cf4944'
				},
				{
					name: 'form-checked',
					hex: '#cf4944'
				}
			]
		];
		this.colors = [
			{
				name: 'text-color',
				hex: '#fff'
			},
			{
				name: 'base-color',
				hex: '#23282d'
			},
			{
				name: 'highlight-color',
				hex: '#0073aa'
			},
			{
				name: 'notification-color',
				hex: '#d54e21'
			},
			{
				name: 'body-background',
				hex: '#f1f1f1'
			},
			{
				name: 'link',
				hex: '#0073aa'
			},
			{
				name: 'button-color',
				hex: '#0073aa'
			},
			{
				name: 'form-checked',
				hex: '#0073aa'
			}
		];
	}

	setColor(name: string, hex: string): Array<Color> | boolean {
		const isColorHex = this.validator.isHex(hex);
		const index = this.colors.findIndex(color => color.name === name);
		if (isColorHex && index > -1) {
			this.colors[index].hex = hex;
			return this.colors;
		}
		return false;

	}

	rotateColors() {
		const rotating = interval(2000);
		const lenght = this.colorsList.length;
		return rotating.pipe(
			map(index => this.colors = this.colorsList[index % lenght])
		);
	}

	getColor(name: string): string {
		const index = this.colors.findIndex(color => color.name === name);
		if (index > -1) {
			return this.colors[index].hex;
		}
		return '';

	}

	setAllColors(colors): Array<Color> {
		colors.forEach(color => {
			this.setColor(color.name, color.hex);
		});
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

	getPHP(): string {
		return this.php;
	}

	init(id: string): boolean {
		const data = this.storage.getScheme(id);
		if (this.id === id) {
			return true;
		} else if (data !== null) {
			this.setId(id);
			this.setName(data.name);
			this.setAllColors(data.colors);
			return true;
		}
		return false;
	}

	generate(): Observable<any> {
		this.generateCSS();
		this.generatePHP();
		this.storage.saveScheme(this.id, this.name, this.colors);
		return this.progress;
	}

	reset(): void {
		this.css = '';
		this.php = '';
	}

	clean(): void {
		this.id = '';
		this.name = '';
		this.colors = [];
	}

	private generateCSS(): Promise<void | Error> {
		return this.mergeSass().then(sass => {
			this.convertSASStoCSS(sass);
		}).catch((err) => {
			console.log(err);
			this.progress.emit({ 'status': 'failed', 'message': err, 'done': true })
		});
	}

	private generatePHP(): Promise<void> {
		return fetch('assets/generator/functions.php.txt').then(template => template.text()).then(results => {
			return results
				.replace(/{{name}}/g, this.name)
				.replace(/{{id}}/g, this.id)
				.replace(/{{body-background}}/g, this.getColor('body-background'))
				.replace(/{{text-color}}/g, this.getColor('text-color'))
				.replace(/{{base-color}}/g, this.getColor('base-color'))
				.replace(/{{notification-color}}/g, this.getColor('notification-color'))
				.replace(/{{highlight-color}}/g, this.getColor('highlight-color'));
		}).then(php => {
			this.php = php;
			this.progress.emit({ 'status': 'generated:php', 'done': !!this.php && !!this.css });
		}).catch(() => {
			this.progress.emit({ 'status': 'failed', 'message': 'Failed to load functions.php.txt', 'done': true });
		});
	}

	private getVariableSCSS(): string {
		let variableSCSS = '';
		if (this.colors) {
			this.colors.forEach(color => {
				variableSCSS += '$' + color.name + ':' + color.hex + ';';
			});
		}
		return variableSCSS;
	}

	private mergeSass(): Promise<string | Error> {
		return fetch('assets/generator/wp_admin.scss').then(template => template.text()).then(results => {
			return this.getVariableSCSS() + results;
		}).catch(() => new Error('Failed to load wp_admin.scss.'));
	}

	private convertSASStoCSS(sass): void {
		try {
			Sass.compile(sass, { style: Sass.style.expanded }, (result) => {
				this.css = result.text;
				this.progress.emit({ 'status': 'generated:css', 'done': !!this.php && !!this.css });
			});
		} catch {
			this.progress.emit({ 'status': 'failed', 'message': 'Failed to generate CSS from SASS.', 'done': true });
		}
	}
}
