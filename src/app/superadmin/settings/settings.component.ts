import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TechnicalSettingsComponent } from "../technical-settings/technical-settings.component";
import { debuglog } from 'util';
import { Globals } from '../../globals/global';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  showSettings:boolean = true;
  showtechnicalsettings: boolean = false;
  showlanguages: boolean = false;
  @ViewChild(TechnicalSettingsComponent)
  private technicalSettingsComponent: TechnicalSettingsComponent;
  constructor(private globals: Globals) { }
  ngOnInit() {
   // this.toggleSettings();
  }
  toggleSettings(){
     this.showSettings = false;
     this.showtechnicalsettings = true;
   }
   toggleLanguages(){
    this.showSettings = false;
    this.showlanguages = true;
  }
}
