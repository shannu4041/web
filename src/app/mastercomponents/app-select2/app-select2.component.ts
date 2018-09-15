/**
 * desc：select2
 * how to use: <select2 [(ngModel)]='your_prop' [options]='your_options' [disabled]='your_condition' ></select2>
 */
declare var require: any
const $ = require('jquery');
require('./select2/select2.js');
import { Component, Optional, Inject, Input, Output, AfterViewInit, ElementRef, EventEmitter, 
	OnChanges, ViewEncapsulation, ViewChild, forwardRef, DoCheck } from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';

@Component({
    selector: 'app-select2',
    templateUrl: './app-select2.component.html',
    styleUrls: ['./select2/select2.min.css'],
    encapsulation: ViewEncapsulation.None,
	animations,
    providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: AppSelect2Component,
		multi: true,
	  }]
})

export class AppSelect2Component extends ElementBase<any> implements OnChanges, AfterViewInit {
    @Input() options: any[] = []; // object: {id, text} or array: []
    @Input() disabled: boolean = false;
    @Output() onSelect = new EventEmitter<any>();

    select2: any;
    private el: ElementRef;
	
	@Input() public label: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string;
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public textBoxColumns: number;
	@Input() public name: string;@Input() public formGroupCssClass: string;
	@Input() public inline: boolean = false;
	@Input() public multiple: boolean = false;
	@Input() public modelProperty: string = 'id';
	@Input() public optionsValueField:string = 'value';
	@Input() public optionsTextField:string = 'text';
	
	textBoxDivCssClass:string = '';
	textBoxGroupCssClass:string = '';
	
	oldValue:any;
	
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();

	@ViewChild(NgModel) model: NgModel;

    constructor(el: ElementRef,
		@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
		@Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
	) {
		super(validators, asyncValidators);
        this.el = el;
    }
	
	ngOnInit() {
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

  ngDoCheck() {
	/* console.log("Select2 Model Value: " + this.value);
	 console.log("NG Do Check");
	 console.log(this.oldValue);
	 console.log(this.value); */

	if (this.value == undefined){
		this.value = [];
	}

	if (this.oldValue != this.value){
		// if (this.oldValue == null){
			// console.log("Select2 Value Changed First");
		// } else {
			// console.log("Select2 Value Changed");
		// }

		this.oldValue = this.value;
		$(this.el.nativeElement).find('select').val(this.value).trigger('change');
	}
  }

    ngAfterViewInit() {
		console.log("After View Init");
        //this.select2.select2('val', this.value);
    }
	
	valueChanged(oldValue, newValue){
		  console.log("Set Value Called From Component - " + oldValue + " - " + newValue);
	  }

    ngOnChanges() {
		/* console.log("Changed");
		console.log(this.options); */
		
		
        this.select2 = $(this.el.nativeElement).find('select').select2({
            //data: this.options,
			multiple: this.multiple,
			width:'100%'
        }).on("select2:select", (ev: any) => {
			console.log("Select 2 Select");
			
			
			var self = this;
			
			var selItems = $(self.el.nativeElement).find('select').select2('data');
			//console.log(selItems);
			
			//if (selItems.length > 0){
            this.value = selItems.map(function(item) { 
								return item[self.modelProperty]; 
							});
			// } else {
				// this.value = null;
			// }
			//console.log(this.value);
			this.onSelect.emit(ev);
        }).on("select2:unselect", (ev: any) => {
			console.log("Select 2 Unselect");
			
            
			var self = this;
			
			var selItems = $(self.el.nativeElement).find('select').select2('data');
			//console.log(selItems);
			
			//if (selItems.length > 0){
            this.value = selItems.map(function(item) { 
								return item[self.modelProperty]; 
							});
			// } else {
				// this.value = null;
			// }
			//console.log(this.value);
			this.onSelect.emit(ev);
        });
    }
}
