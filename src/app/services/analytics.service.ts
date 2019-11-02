import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';


declare let gtag: Function;

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {

	gaMeasurmentId: string;
	dimensionIndex: number;

	constructor(private logger: LoggerService) {
		this.gaMeasurmentId = 'UA-79194198-4';
		this.dimensionIndex = 1;
	}

	public setDimension(dimension: string) {
		const newDimension = {};
		newDimension['dimenstion' + this.dimensionIndex] = dimension;
		this.logger.debug('New Dimension', false, newDimension);
		gtag('config', this.gaMeasurmentId, { 'custom_map': newDimension });
	}

	public setPageView(path: string) {
		this.logger.debug('New PageView', false, path);
		gtag('config', this.gaMeasurmentId,
			{
				'page_path': path
				// To Do add page_title [https://developers.google.com/analytics/devguides/collection/gtagjs/pages]
			}
		);
	}

	public eventEmitter(eventName: string, params: any = {}) {
		this.logger.debug('New Event ' + eventName, false, params);
		gtag('event', eventName, params);
	}
}
