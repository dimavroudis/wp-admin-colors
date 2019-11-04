import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
	selector: 'wpasg-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.scss']
})
export class ExportPageComponent implements OnInit {

	isGenerated: boolean;
	php: string;
	css: string;
	generatorProgress: Subscription;
	id: string;

	constructor(
		private generator: GeneratorService,
		private router: Router,
		private route: ActivatedRoute,
		private analytics: AnalyticsService
	) {
		this.isGenerated = false;
	}

	ngOnInit() {

		this.id = this.route.snapshot.paramMap.get('id');
		const isValid = this.generator.init(this.id);

		if (!this.id || !isValid) {
			this.router.navigate(['/']);
		} else {
			this.generatorProgress = this.generator.generate().subscribe(value => {
				this.isGenerated = value.done;
				if (this.isGenerated) {
					this.css = this.generator.getCSS();
					this.php = this.generator.getPHP();
					this.generatorProgress.unsubscribe();
					this.generator.reset();
					this.analytics.eventEmitter('generate_scheme', {
						'event_category': 'engangement',
						'event_label': JSON.stringify(this.generator.getAllColors())
					});
				}
			});
		}
	}



}
