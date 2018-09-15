import { Component, Optional, OnInit, Inject, ViewEncapsulation, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrls: ['./app-switch.component.css'],
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppSwitchComponent,
    multi: true,
  }]
})
export class AppSwitchComponent extends ElementBase<string> {
	@Input() public label: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string = '';
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public switchColumns: number;
	@Input() public name: string;@Input() public formGroupCssClass: string;
	@Input() public inline: boolean = false;
	
	switchDivCssClass:string = '';
	
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
	  if (this.inline){
		this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
		this.switchDivCssClass = 'col-' + this.switchColumns;
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