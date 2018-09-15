import { Injectable } from '@angular/core';
import { CommonService } from "./authentication/auth.service";
import { LanguageService } from "./services/language.service";
import { Globals } from './globals/global';

declare let toastr;

@Injectable()
export class AppHelper {
  constructor(private globals: Globals, private _commonservice:CommonService,
	private _languageservice:LanguageService) {}
  
  userLogOut(){
	  this._commonservice.isLoggedIn = false;
	 this._commonservice.setUserData({});
	 this.globals.switchLanguageValue = {};
	this._commonservice.logout().subscribe((response) => {
             if (response.success) {
                 toastr.success(this.globals.switchLanguageValue['LOGOUT_SUCCESS'])
                // this.router.navigate(['/']);
		 } else {
			 toastr.warning(this.parseMessageFromLanguage(response.message), response);
		 }
	 });
  }
  
  switchLanguage(id:number){
			console.log('App Helper Get Language Call Start');
        this._languageservice.getLanguageKeys(id).subscribe((response) => {
			console.log('App Helper Get Language Call End');
            if (response.success) {
                this.globals.switchLanguageValue =response.data;
                //console.log(this.globals.switchLanguageValue);
            } else {
                toastr.warning(this.parseMessageFromLanguage(response.message));
            }
        });
    }
	
	parseMessageFromLanguage(msg:any){
		let parsedMessage = "";
		if (msg instanceof Array) {
			for (let m of msg){
				parsedMessage = parsedMessage + this.parseMsg(m) + ',';
			}
			
			if (parsedMessage.length > 0){
				parsedMessage = parsedMessage.slice(0,-1);
			}
		} else {
			parsedMessage = this.parseMsg(msg);
		}
		return parsedMessage;
	}
	
	parseMsg(msg:any){
		let msgArray = msg.split('|');
		
		if (this.globals.switchLanguageValue && this.globals.switchLanguageValue[msgArray[0]]){
			msg = this.globals.switchLanguageValue[msgArray[0]];
		} else {
			msg = msgArray[0];
		}
		
		if (msgArray.length > 1){
			if (this.globals.switchLanguageValue && this.globals.switchLanguageValue[msgArray[1]]){
				msg = msg + ' - ' + this.globals.switchLanguageValue[msgArray[1]];
			} else {
				msg = msg + ' - ' + msgArray[1];
			}
		}
		
		return msg;
	}
}