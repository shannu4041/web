import { Injectable } from '@angular/core';
import { ProfileActionService } from "../services/profileaction.service";
import { Globals } from '../globals/global';
import { AppHelper } from '../apphelper';

declare let toastr;

@Injectable()
export class Helper {
  constructor(private apphelper:AppHelper,private _profileaction:ProfileActionService, private globals: Globals) {}
  
  getUserProfileAction(){
        this._profileaction.getUserProfileAction().subscribe((response) => {
            if (response.success) {
                this.globals.getprofileaction = response.data;
            } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
        });
    }
}