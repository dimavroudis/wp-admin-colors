import { Component, Input, AfterContentChecked } from '@angular/core';
import hljs from 'highlight.js';

@Component({
	selector: 'code-block',
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements AfterContentChecked {

	@Input() code;
	@Input() type;

	constructor() {

	}

	ngAfterContentChecked(): void {
		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
	}

}
