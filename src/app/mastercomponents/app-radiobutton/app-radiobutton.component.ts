import { Component, Optional, OnInit, Inject, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './app-radiobutton.component.html',
  styleUrls: ['./app-radiobutton.component.css'],
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppRadioComponent,
    multi: true,
  }]
})
export class AppRadioComponent extends ElementBase<string> {
	
	@Input() public label: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string = '';
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public radioBoxListColumns: number;
	@Input() public name: string;@Input() public formGroupCssClass: string;
	@Input() public inline: boolean = false;
	@Input() public inlineRadio: boolean = false;
	@Input() public options = [];
	
	textBoxDivCssClass:string = '';
	textBoxGroupCssClass:string = 'm-radio-list';
	
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();

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
		this.textBoxDivCssClass = 'col-' + this.radioBoxListColumns;
	  }
	  
	  if (this.inlineRadio){
		  this.textBoxGroupCssClass = 'm-radio-inline';
	  }
  }

  fireClick(e){
	  this.onClick.emit(e);
  }
  
  fireFocus(e){
	  this.onFocus.emit(e);
  }
  
  fireBlur(e){
	  this.onBlur.emit(e);
  }
  
  fireChange(e){
	  this.onChange.emit(e);
  }
}
