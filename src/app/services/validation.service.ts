import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {

	constructor() { }

	makeSafeId(id: string): string {
		return id.replace(/[^a-z0-9]/g, (s) => {
			const c = s.charCodeAt(0);
			if (c === 32) {
				return '-';
			}
			if (c >= 65 && c <= 90) {
				return s.toLowerCase();
			}
			if (c === 45) {
				return s;
			}
			return '';
		});
	}

	makeSafeName(name: string): string {
		return name;
	}

	isHex(subject: string): boolean {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(subject);
	}
}
