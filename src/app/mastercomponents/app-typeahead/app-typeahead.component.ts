import { Component, Optional, OnInit, Inject, ViewEncapsulation, 
Input, Output, ViewChild, EventEmitter } from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';

import {NgbTypeaheadConfig} from '../ngbcomponents/typeahead/typeahead-config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-typeahead',
  templateUrl: './app-typeahead.component.html',
  styleUrls: ['./app-typeahead.component.css'],
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppTypeaheadComponent,
    multi: true,
  }]
})

export class AppTypeaheadComponent extends ElementBase<string> {
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
	@Input() public prependIcon: string = '';
	@Input() public appendIcon: string = '';
	@Input() public showHint: boolean = false;
	@Input() public restrictToOptionsOnly: boolean = false;
	@Input() public searchOptions = [];
	
	textBoxDivCssClass:string = '';
	textBoxGroupCssClass:string = '';
	
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();
	@Output() onItemSelected = new EventEmitter();

	@ViewChild(NgModel) model: NgModel;
	
  constructor(
	@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
	config: NgbTypeaheadConfig) {
		super(validators, asyncValidators);
		
  }
  
  searchOptionsData = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
			.map(term =>term.length < 1 ? []
				: this.searchOptions.filter(v => v.label.toLowerCase().indexOf(term.toLocaleLowerCase())> -1).splice(0, 10)  
			);
		
	searchDataFormatter = (x: {label: string}) => x.label;

  ngOnInit() {
	  if (this.searchOptions == undefined){
		this.searchOptions = [];
	  }
	  if (this.inline){
		this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
		this.textBoxDivCssClass = 'col-' + this.textBoxColumns;
	  }
	  
	  if (this.prependIcon.length > 0 && this.appendIcon.length > 0){
		  this.textBoxGroupCssClass = 'm-input-icon m-input-icon--left m-input-icon--right';
	  }
	  else if (this.prependIcon.length > 0){
		  this.textBoxGroupCssClass = 'm-input-icon m-input-icon--left';
	  }
	  else if (this.appendIcon.length > 0){
		  this.textBoxGroupCssClass = 'm-input-icon m-input-icon--right';
	  }
  }
  
  itemSelected(e){
	  this.onItemSelected.emit(e);
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
