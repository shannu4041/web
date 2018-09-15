import { Component, Optional, OnInit, Inject, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';

@Component({
  selector: 'app-selectbox',
  templateUrl: './app-selectbox.component.html',
  styleUrls: ['./app-selectbox.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppSelectboxComponent,
    multi: true,
  }]
})
export class AppSelectboxComponent extends ElementBase<string> {
	@Input() public label: string;
	@Input() public placeholder: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string;
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public textBoxColumns: number;
	@Input() public name: string;@Input() public formGroupCssClass: string;
	@Input() public describedby: string;
	@Input() public inputType: string;
	@Input() public inline: boolean = false;
	@Input() public options = [];
	@Input() public optionsValueField:string = 'value';
	@Input() public optionsTextField:string = 'text';
	@Input() public setDisabled:boolean=false;
	textBoxDivCssClass:string = '';
	textBoxGroupCssClass:string = '';
	
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();

	@ViewChild(NgModel) model: NgModel;

  constructor(
	@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) { 
	super(validators, asyncValidators);
  }

  ngOnInit() {
	  console.log(this.optionsTextField);
	  if (this.inline){
		this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
		this.textBoxDivCssClass = 'col-' + this.textBoxColumns;
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
