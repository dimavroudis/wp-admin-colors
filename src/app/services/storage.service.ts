import { Injectable } from '@angular/core';
import { Color } from '../models/colors.model';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	/**
	 * Save key-value pair to storage
	 *
	 */
	set(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	/**
	 * Get value from storage
	 *
	 */
	get(key: string) {
		return localStorage.getItem(key);
	}

	/**
	 * Save Scheme to storage
	 *
	 */
	saveScheme(id: string, name: string, colors: Color[]): void {
		this.set('scheme-' + id, JSON.stringify({ name, colors }));
	}

	/**
	 * Get Scheme Value from storage
	 *
	 */
	getScheme(id: string): { name: string, colors: Color[] } {
		const data = this.get('scheme-' + id);
		return data ? JSON.parse(data) : null;
	}
}
