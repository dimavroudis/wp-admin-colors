import { Component, OnInit } from '@angular/core';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'customizer-page',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CustomizerPage implements OnInit {

  constructor(private generator: GeneratorService) { }

  ngOnInit() {
	  this.generator.convertSASStoCSS();
  }

}
