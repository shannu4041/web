import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { CommonService } from "../../authentication/auth.service";
import { LanguageService } from "../../services/language.service";
import { ProfileActionService } from "../../services/profileaction.service";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { Helper } from '../helper';


declare let toastr;
declare let mLayout: any;
@Component({
    selector: 'app-top-nav',
    templateUrl: './nav.header.html',
    //styleUrls: ['./signin.component.css']
})
export class HeaderComponent implements OnInit {
    UserData:any={};
    languages=[];
    showLanguageDropDown:boolean=false;
    page:any;
    multiAccount:any;
    constructor(private apphelper:AppHelper,private _service:CommonService,private _languageservice:LanguageService,
        private route: ActivatedRoute,
        private _profileaction:ProfileActionService,private router:Router,private globals: Globals,
		private helper: Helper) { 
        
		//this.getAllLanguages();
        helper.getUserProfileAction();
        this.route.data.subscribe((params:any) => {
            this.page = params.data;
        });
    }
    

    ngOnInit() {
       this.UserData=this._service.UserData;
	   this.showLanguageDropDown=false;
       // this.isMultiUserAccount();
    }

    onLogout(){
        this.apphelper.userLogOut();
    }
	
    /* isMultiUserAccount(){
        this._service.isMultiUserAccount().subscribe((response:any)=> {
           if(response.success){
           this.multiAccount=response.data.count;
           }
           
       })
   } */
   
   /* switchLanguage(id:number){
		this.showLanguageDropDown=false;
		this.apphelper.switchLanguage(id);
	} */

    /* getLanguages(){
        this.showLanguageDropDown=!this.showLanguageDropDown
    } */

    /* getAllLanguages(){
        this._languageservice.getLanguageCodes().subscribe((response) => {
            if (response.success) {
                this.languages=response.data;
            } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
        });
    } */

    ngAfterViewInit() {
		if (mLayout){
			mLayout.initHeader();
		}
    }

}
