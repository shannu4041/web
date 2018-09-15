import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { CommonService } from "../../authentication/auth.service";
import { LanguageService } from "../../services/language.service";
import { ProfileActionService } from "../../services/profileaction.service";
import { Globals } from '../../globals/global';


declare let toastr;
declare let mLayout: any;
@Component({
    selector: 'top-nav',
    templateUrl: './nav.header.html',
    //styleUrls: ['./signin.component.css']
})
export class HeaderComponent implements OnInit {
    UserData:any={};
    languages=[];
    showLanguageDropDown:boolean=false;
    page:any;
    superadmincheck:any;
    multiAccount:any;
    constructor(private _service:CommonService,private _languageservice:LanguageService,
        private route: ActivatedRoute,
        private _profileaction:ProfileActionService,private router:Router,private globals: Globals) { 
        console.log(this.globals.account);
         globals.switchLanguageValue ={};
         
         this.getAllLanguages();
         this.switchLanguage(1);
         this.getUserProfileAction();
         console.log('Users Component');
        this.route.data.subscribe((params:any) => {
            this.page = params.data;
          });
    }
    

    ngOnInit() {
        // this.UserData=this._service.UserData;
       this.loginUserData();
       //this.checkinglogin();
       if(this.page=='superadmin'){
        this.checkinglogin();
        }
        this.isMultiUserAccount();
    }

    onLogout(){
        this._service.logout().subscribe((response) => {
            if (response.success) {
                this._service.isLoggedIn = true;
                toastr.success('Logout Successfully')
               // this.router.navigate(['/']);
            } else {
                toastr.warning(response.message, response);
            }
        });
    }

    loginUserData(){
        this._service.checkLogin().subscribe((response) => {
            if (response.success) {
                this.UserData=response.data;
            } else {
                toastr.warning(response.message, response);
            }
        });
    }

     checkinglogin(){
	 	this._service.IsSuperadmin().subscribe((response:any)=> {
			if(response.success){
			this.superadmincheck=response.success;
	 		}
			
	    })
    }
    isMultiUserAccount(){
        this._service.isMultiUserAccount().subscribe((response:any)=> {
           if(response.success){
           this.multiAccount=response.data.count;
           }
           
       })
   }

    getLanguages(){
        this.showLanguageDropDown=!this.showLanguageDropDown
    }

    getAllLanguages(){
        this._languageservice.getLanguageCodes().subscribe((response) => {
            if (response.success) {
                this.languages=response.data;
            } else {
                toastr.warning(response.message, response);
            }
        });
    }

    switchLanguage(id:number){
        this._languageservice.getLanguageKeys(id).subscribe((response) => {
            if (response.success) {
                this.globals.switchLanguageValue =response.data;
                this.showLanguageDropDown=false;
                //console.log(this.globals.switchLanguageValue);
            } else {
                toastr.warning(response.message, response);
            }
        });
    }


    getUserProfileAction(){
        this._profileaction.getUserProfileAction().subscribe((response) => {
            if (response.success) {
                this.globals.getprofileaction = response.data;
            } else {
                toastr.warning(response.message, response);
            }
        });
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}
