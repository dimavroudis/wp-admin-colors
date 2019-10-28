import { Component, Input, AfterContentChecked, OnInit } from '@angular/core';
import hljs from 'highlight.js';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
	selector: 'code-block',
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit, AfterContentChecked {
	textFile: string;
	link: SafeResourceUrl;
	@Input() code: string;
	@Input() type: 'php' | 'css';
	@Input() download: boolean;
	@Input() downloadFileName: string;
	@Input() downloadFileType: string;


	constructor(private sanitizer: DomSanitizer) {

	}

	ngOnInit(): void {

	}

	ngAfterContentChecked(): void {
		this.link = this.makeTextFile();
		setTimeout(() => {
			document.querySelectorAll('pre code').forEach((block) => {
				hljs.highlightBlock(block);
			});
		});
	}

	makeTextFile() {

		const data = new Blob([this.code], { type: this.downloadFileType });
		// If we are replacing a previously generated file we need to
		// manually revoke the object URL to avoid memory leaks.
		if (this.textFile !== null) {
			window.URL.revokeObjectURL(this.textFile);
		}

		this.textFile = window.URL.createObjectURL(data);

		return this.sanitizer.bypassSecurityTrustResourceUrl(this.textFile);
	};

}
