import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-inputtext',
  templateUrl: './app-inputtext.component.html',
  styleUrls: ['./app-inputtext.component.css']
})
export class AppInputTextComponent implements OnInit {
	@Output() eventEmitterBlur = new EventEmitter();
	@Input() cssClass: string;
	
	//myModel: any;
  constructor(){
    //this.myModel = '123';
  }
   ngOnInit() {
  }
   

    eventEmitBlur(event) {
        this.eventEmitterBlur.emit(event);
    }
}
