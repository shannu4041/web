import {Directive, Attribute} from '@angular/core';

import {
  NG_VALIDATORS,
  AbstractControl,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[minlengtharray][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinLengthArrayValidator, multi: true }
  ]
})
export class MinLengthArrayValidator implements Validator {
	minLength:number = 0;
	constructor(@Attribute("minlength") minLength: number) {
    this.minLength = minLength;
  }
	
  validate(control: AbstractControl): {[validator: string]: string} {
    if (!control.value){
		return null;
	}
	if (control.value.length >= this.minLength){
		return null;
	}

    return {minlengtharray: 'Please select atleast ' + this.minLength + ' option(s)'};
  }
}
