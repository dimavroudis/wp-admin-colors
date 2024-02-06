import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {

	constructor() { }

	makeSafeId(id: string): string {
		return id.replace(/[^a-z0-9]/g, (s) => {
			if (s === ' ' || s === '_' || s === '_') {
				return '_';
			}
			const c = s.charCodeAt(0);
			if (c >= 65 && c <= 90) {
				return s.toLowerCase();
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
