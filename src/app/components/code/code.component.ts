import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import hljs from 'highlight.js';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics.service';


@Component({
	selector: 'wpasg-code-block',
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit, AfterViewInit {
	textFile: string;
	link: SafeResourceUrl;
	@Input() code: string;
	@Input() type: 'php' | 'css';
	@Input() download: boolean;
	@Input() title: string;
	@Input() copy: boolean;
	@Input() downloadFileName: string;
	@Input() downloadFileType: string;


	constructor(private sanitizer: DomSanitizer, private analytics: AnalyticsService) {

	}

	ngOnInit(): void {
		this.link = this.makeTextFile();
	}

	ngAfterViewInit(): void {
		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
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
	}

	copyToClipborad(str) {
		this.analytics.eventEmitter('copy', {
			'event_category': 'engangement',
			'event_label': this.type
		});
		const el = document.createElement('textarea');
		el.value = str;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}

	trackDownload() {
		this.analytics.eventEmitter('download', {
			'event_category': 'engangement',
			'event_label': this.type
		});
	}

}
