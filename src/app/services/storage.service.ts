import { Injectable } from '@angular/core';
import { Color } from '../models/colors.model';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }


	saveScheme(id: string, name: string, colors: Color[]): void {
		localStorage.setItem('scheme-' + id, JSON.stringify({ name, colors }));
	}

	getScheme(id: string): { name: string, colors: Color[] } {
		const data = localStorage.getItem('scheme-' + id);
		return data ? JSON.parse(data) : null;
	}
}
