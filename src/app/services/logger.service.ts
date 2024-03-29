import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoggerService {
	isProd = environment.production;
	constructor() { }

	debug(title: string, trace: boolean, ...data: any[]): void {
		if (!this.isProd) {
			console.debug(new Date() + ': ' + title, ...data);
			if (trace) {
				console.trace();
			}
		}
	}

	error(title: string, trace: boolean, ...data: any[]): void {
		console.error(new Date() + ': ' + title, ...data);
		if (trace) {
			console.trace();
		}
	}

	debugArray(title: string, trace: boolean, array: any[]): void {
		if (!this.isProd) {
			console.info(new Date() + ': ' + title);
			console.table(array);
		}
	}


}
