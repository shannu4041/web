import { Component, Optional, OnInit, Inject, ViewEncapsulation, Input, Output, ViewChild, EventEmitter  } from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';
import { DropzoneConfig } from '../dropzone/dropzone.interfaces';

@Component({
  selector: 'app-dropzone',
  templateUrl: './app-dropzone.component.html',
  styleUrls: ['./app-dropzone.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppDropZoneComponent,
    multi: true,
  }]
})

export class AppDropZoneComponent extends ElementBase<Array<any>> {
	
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
	@Input() public inline: boolean = false;
	@Input() public textAreaRows: number = 3;
	@Input() public config:DropzoneConfig;

	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();
	@Output() onsuccess =  new EventEmitter();
	@Output() onRemovedFile =  new EventEmitter();
	@Output() onError =  new EventEmitter();
	
	textBoxDivCssClass:string = '';

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
			this.textBoxDivCssClass = 'col-' + this.textBoxColumns;
		}
		
		if (!this.config){
			this.config = new DropzoneConfig();
		}
		this.config.withCredentials = true;	
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

	firesuccess(e)
	{
			//console.log(e);
		if(e){
			e=JSON.parse(e[1]);
		}
		if (e && e.success){
			if (this.config && this.config.uploadMultiple && this.config.uploadMultiple == true){
				if(this.value == null)
					this.value = [];
				this.value.push(e.data[0]);
			} else {
				this.value = e.data[0];
			}
		} else {
			this.onUploadError(e);
		}
	}
	
	onUploadError(e)
	{
		//console.log(e)
		this.onError.emit(e);
	}

	fireRemovedFile(e)
	{
		//console.log('called remove file function');
		//console.log(e);
		this.onRemovedFile.emit(e);
	}
}
