import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {

	constructor() { }

	makeSafeId(id: string): string {
		return id.replace(/[^a-z0-9]/g, function (s) {
			var c = s.charCodeAt(0);
			if (c == 32) return '-';
			if (c >= 65 && c <= 90) return s.toLowerCase();
			return '__' + ('000' + c.toString(16)).slice(-4);
		});
	}

	makeSafeName(name: string): string {
		return name;
	}
}
