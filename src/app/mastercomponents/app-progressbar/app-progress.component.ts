import { Component, Optional, OnInit, Inject, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';

@Component({
  selector: 'app-progress',
  templateUrl: './app-progress.component.html',
  styleUrls: ['./app-progress.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppProgressbarComponent,
    multi: true,
  }]
})
export class AppProgressbarComponent extends ElementBase<string> {
	@Input() public label: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string;
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public progressColumns: number;
	@Input() public displayText: boolean = true;
	@Input() public displayValue: boolean = true;
	@Input() public textValueSeperator: string = '-';
	@Input() public inline: boolean = false;
	@Input() public progressBarSize:string = '20';
	@Input() public progressBarTextSize:string = '14';
	
	@Input() public progressBarData:any[] = [];
	
	progressbarDivCssClass:string = '';
	
	@ViewChild('field') model: NgModel;
   constructor(
	@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) { 
	super(validators, asyncValidators);
  }

  ngOnInit() {
	if (this.inline){
		this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
		this.progressbarDivCssClass = 'col-' + this.progressColumns;
	}
	}

}
