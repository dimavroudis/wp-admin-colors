import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';


declare let dataLayer: Array<any>;

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {

	gaMeasurmentId: string;
	dimensionIndex: number;

	constructor(private logger: LoggerService) {
		this.gaMeasurmentId = 'G-K0JZSKSPDT';
		this.dimensionIndex = 1;

		this.gtag('js', new Date());
		this.gtag('config', this.gaMeasurmentId, {
			'anonymize_ip': true
		});
	}

	public gtag(...args: any) {
		dataLayer.push(args);
	}

	public setDimension(dimension: string) {
		const newDimension = {};
		newDimension['dimenstion' + this.dimensionIndex] = dimension;
		this.logger.debug('New Dimension', false, newDimension);
		this.gtag('config', this.gaMeasurmentId, { 'custom_map': newDimension });
	}

	public setPageView(path: string) {
		this.logger.debug('New PageView', false, path);
		this.gtag('config', this.gaMeasurmentId,
			{
				'page_path': path
				// To Do add page_title [https://developers.google.com/analytics/devguides/collection/this.gtagjs/pages]
			}
		);
	}

	public eventEmitter(eventName: string, params: any = {}) {
		this.logger.debug('New Event ' + eventName, false, params);
		this.gtag('event', eventName, params);
	}
}
