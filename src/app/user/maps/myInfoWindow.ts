import { Component, Input, ElementRef } from '@angular/core';
import { InfoWindow, NguiMapComponent } from '@ngui/map'
import { NguiMap } from '@ngui/map';
import { debug } from 'util';
import { Element } from '@angular/compiler';
import { element } from 'protractor';

const INPUTS = [
  'content', 'disableAutoPan', 'maxWidth', 'pixelOffset', 'position', 'zIndex', 'options'
];
const OUTPUTS = [
  'closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'
];

@Component({
  selector: 'ngui-map > my-info-window',
  inputs: INPUTS,
  outputs: OUTPUTS,
  template: '<div #template><ng-content></ng-content></div>',
})

export class MyInfoWindow extends InfoWindow {

  @Input() myId: string;
  elementRefNew: ElementRef;

  constructor(elementRef: ElementRef,
    nguiMap: NguiMap,
    nguiMapComponent: NguiMapComponent) {
    super(elementRef, nguiMap, nguiMapComponent);
    this.elementRefNew = elementRef;
  }

  ngOnInit() {
    this.elementRefNew.nativeElement.id = 'iw-' + this.myId.toString();
    console.log("My Info Window ID: iw-" + this.myId);
    super.ngOnInit();
  }
}
