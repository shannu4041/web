import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.css']
})
export class AppButtonComponent implements OnInit {
	@Input() buttonText: string;
	@Input() cssClass: string;
	@Input() buttonType: string = 'button';
	
	@Output() onClick = new EventEmitter();
	@Input() buttonIcon:string;

  constructor() { }

  ngOnInit() {
  }
  
  fireClick(e){
	  this.onClick.emit(e);
  }
}
