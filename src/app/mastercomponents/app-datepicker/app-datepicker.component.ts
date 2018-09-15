import { Component, OnInit, ElementRef, DoCheck, Output, EventEmitter, Optional, ViewChild, Inject, 
	Input } from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';
import $ from "jquery";
require('bootstrap-datepicker');


@Component({
  selector: 'app-datepicker',
  templateUrl: './app-datepicker.component.html',
  styleUrls: ['./app-datepicker.component.css'],
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppDatepickerComponent,
    multi: true,
  }]
})
export class AppDatepickerComponent extends ElementBase<string> implements DoCheck {
	@Input() public label: string;
	@Input() public placeholder: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string;
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public textBoxColumns: number;
	@Input() public name: string;@Input() public formGroupCssClass: string;
	@Input() public inline: boolean = false;
	@Input() public showPickerOnTop:boolean = false;
	
	oldValue:any;
	textBoxDivCssClass:string = '';
	textBoxGroupCssClass:string = '';
	
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();

	@ViewChild(NgModel) model: NgModel;
	
  constructor(private el: ElementRef, 
	@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
	) { 
	super(validators, asyncValidators);
  }
  
  ngDoCheck() {
	//console.log("Model Value: " + this.value);
	
	if (this.oldValue != this.value){
		// if (this.oldValue == null){
			// console.log("Value Changed First");
		// } else {
			// console.log("Value Changed");
		// }
		this.oldValue = this.value;
		$(this.el.nativeElement).find('input').datepicker('update',this.value);
	}
  }
  
  ngOnInit() {
	  //console.log("On Init");
	  if (this.inline){
		this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
		this.textBoxDivCssClass = 'col-' + this.textBoxColumns;
	  }
  }
  
  ngAfterViewInit(){
	//console.log("On After View Init");
	
	var dpoptions = {
		todayHighlight: true,
		orientation: "bottom left",
		autoclose: true,
		templates: {
			leftArrow: '<i class="la la-angle-left"></i>',
			rightArrow: '<i class="la la-angle-right"></i>'
		}
	};
	
	if (this.showPickerOnTop){
		dpoptions.orientation = "top left";
	}
	
	$(this.el.nativeElement).find('input').datepicker(dpoptions).on('changeDate', (e) => {
            this.value = moment(e.date).format('MM/DD/YYYY');
        });
	
	this.oldValue = this.value;
  }
  
  iconClick(e) {
	$(this.el.nativeElement).find('input').datepicker('show');
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
