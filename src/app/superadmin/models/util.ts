import { Injectable } from '@angular/core';

@Injectable()
export class Util{

    convertToDropdownClass(object:any,textproperty:string,valueproperty:string)
    {
        object.text = object[textproperty];
        object.value = object[valueproperty];
        return object;
    }
}