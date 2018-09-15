import {ControlValueAccessor} from '@angular/forms';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;

  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();

  ngOnInit() {
	  
  }

  get value(): T {
	  //console.log("Get Value Called - " + this.innerValue);
    return this.innerValue;
  }

  set value(value: T) {
	  //console.log("Set Value Called - " + this.innerValue + " - " + value);
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
	this.valueChanged(value, this.innerValue);
  }
  
  valueChanged(oldValue, newValue){
	  
  }

  writeValue(value: T) {
	  //console.log("Write Value Called - " + value);
    this.innerValue = value;
  }

  registerOnChange(fn: (value: T) => void) {
	  //console.log("Register On Change Called");
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    //console.log("Register On Touched Called");
	this.touched.push(fn);
  }

  touch() {
	  //console.log("Touch Called");
    this.touched.forEach(f => f());
  }
}