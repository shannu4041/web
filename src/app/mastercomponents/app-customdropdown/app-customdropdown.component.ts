import { Component, OnInit, Input, ElementRef } from '@angular/core';
declare var jquery:any;
declare var $ :any;

import { debug } from 'util';

@Component({
  selector: 'app-customdropdown',
  templateUrl: './app-customdropdown.component.html',
  styleUrls: ['./app-customdropdown.component.css']
})
export class AppCustomdropdownComponent implements OnInit {
  @Input() public width:string = "300px";
  @Input() public toggle: string = 'click';
  @Input() public persistent: boolean = false;
  @Input() public isModal: boolean = false;
  
  constructor(private el: ElementRef) { }

  ngOnInit() {
    
  }

    dropdownclick(e){
      e.ischild = true;
    }

  hide(){
      $(this.el.nativeElement).find('.m-dropdown').mDropdown().hide();
  }

  backdropclick(){
    $('body').click();
  }
}
