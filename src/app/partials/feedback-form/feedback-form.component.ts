import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'wpasg-feedback-form',
	templateUrl: './feedback-form.component.html',
	styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

	feedbackForm: FormGroup;
	status: string;
	constructor(private http: HttpClient) {
		this.status = 'idle';
		this.feedbackForm = new FormGroup({
			rating: new FormControl('', Validators.required),
			comment: new FormControl(''),
			email: new FormControl('', Validators.email),
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		if (this.feedbackForm.valid) {
			this.status = 'sending';
			const httpOptions = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
			};
			this.http.post(
				'https://dev.mavrou.gr/api/forms/submit/wpasgfeedback?token=58484183684fcedb22adb7e7fb3e49',
				{form: this.feedbackForm.value},
				httpOptions
			).subscribe(
				() => {
					this.status = 'success';
				},
				(err) => {
					this.status = 'error';
					console.log(err);
				}
			);
		}
	}

}
